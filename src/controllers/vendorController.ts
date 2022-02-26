import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getManifest, readContentPath } from '../library/destiny/manifest/api';
import { InventoryItems } from '../library/destiny/manifest/interfaces';
import { DestinyLocation } from '../library/destiny/models/destinyLocation';
import { ItemType } from '../library/destiny/models/itemTypes';
import { DestinyVendorDefinition } from '../library/destiny/models/vendor';
import { getAdaModSales, getXurSalesAndLocation } from '../library/destiny/vendors';
import { createErrorMessage, isSuccesStatusCode } from '../library/httpHelpers';

export const sendAdaSale = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const modSales = await getAdaModSales(req.destinyClient);

		const manifests = await getManifest(req.destinyClient);
		const manifestUrl = manifests
			.data
			.Response
			.jsonWorldComponentContentPaths
			.en
			.DestinyInventoryItemLiteDefinition;

		const inventoryItems = await readContentPath<InventoryItems>(req.destinyClient, manifestUrl);
		const itemEntries = Object.entries(inventoryItems.data);
		const mods = modSales.flatMap(x => {
			const mod = itemEntries.find(d => d[0] === x.itemHash.toString());
			if (mod && mod[1].itemType === ItemType.mod) {
				return mod[1];
			}

			return [];
		});

		if (!mods.length) {
			return next('no sales found');
		}

		// await sendAdaSalesToDiscord(req.discordClient, mods);
		return res.status(200).json(mods);
	} catch (err) {
		if (err instanceof Error) {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(createErrorMessage(err.message));
		}

		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
	}
};

export const xurRequest = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const xur = await getXurSalesAndLocation(req.destinyClient);

		if (!isSuccesStatusCode(xur)) {
			return next('Couldnt find Xur.');
		}

		const manifests = await getManifest(req.destinyClient);
		const url = manifests
			.data
			.Response
			.jsonWorldComponentContentPaths
			.en
			.DestinyVendorDefinition;

		const itemsUrl = manifests
			.data
			.Response
			.jsonWorldComponentContentPaths
			.en
			.DestinyInventoryItemLiteDefinition;

		const itemDefinitionsReq = await readContentPath<InventoryItems>(req.destinyClient, itemsUrl);
		const itemDefinitions = Object.entries(itemDefinitionsReq.data);
		const vendorDefinitions = await readContentPath<DestinyVendorDefinition>(req.destinyClient, url);
		const keys = Object.entries(vendorDefinitions.data);

		const entry = keys
			.find(x => x[0] === xur.data.Response.vendor.data.vendorHash.toString());

		if (!entry) {
			return next('couldnt find location');
		}

		const destinationUrl = manifests
			.data
			.Response
			.jsonWorldComponentContentPaths
			.en
			.DestinyDestinationDefinition;
		const destinationDefinitions = await readContentPath<DestinyLocation>(req.destinyClient, destinationUrl);

		const xurDefinition: DestinyVendorDefinition = entry[1];
		const locationHash = xurDefinition.locations[xur.data.Response.vendor.data.vendorLocationIndex];
		const locationKeys = Object.entries(destinationDefinitions.data);
		const locationEntry: [string, DestinyLocation] | undefined = locationKeys
			.find(x => x[0] === locationHash.destinationHash.toString());

		if (!locationEntry) {
			return next('Couldnt find location');
		}

		const location = locationEntry[1];



		const itemEntries = Object.entries(xur.data.Response.sales.data);
		const items = itemEntries.flatMap(([_, sale]) => {
			const itemDefinition = itemDefinitions.find(d => d[0] === sale.itemHash.toString());

			if (!itemDefinition) {
				return [];
			}

			return [itemDefinition[1]];
		});

		// sendXurLocationAndSalesToDiscord(req.discordClient, location, items);

		return res.status(StatusCodes.OK).json('success');
	} catch (err) {
		return next(err);
	}
};
