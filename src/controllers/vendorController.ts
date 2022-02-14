import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getManifest, readContentPath } from '../library/destiny/manifest/api';
import { InventoryItems } from '../library/destiny/manifest/interfaces';
import { DestinyVendorDefinition } from '../library/destiny/models/vendor';
import { getAdaModSales, getXurSalesAndLocation } from '../library/destiny/vendors';
import { sendAdaSalesToDiscord } from '../library/discord/ada/api';
import { createErrorMessage } from '../library/httpHelpers';

export const sendAdaSale = async (req: Request, res: Response) => {
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
			if (mod) {
				return mod[1];
			}

			return [];
		});

		await sendAdaSalesToDiscord(req.discordClient, mods);
		return res.status(200).json(mods);
	} catch (err) {
		if (err instanceof Error) {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(createErrorMessage(err.message));
		}

		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
	}
};

export const xurRequest = async (req: Request, res: Response, next: NextFunction) => {
	const xur = await getXurSalesAndLocation(req.destinyClient);
	const manifests = await getManifest(req.destinyClient);
	const url = manifests
		.data
		.Response
		.jsonWorldComponentContentPaths
		.en
		.DestinyVendorDefinition;
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
	const destinationDefinitions = await readContentPath(req.destinyClient, destinationUrl);

	const xurDefinition: DestinyVendorDefinition = entry[1];
	const locationHash = xurDefinition.locations[xur.data.Response.vendor.data.vendorLocationIndex];
	const locationKeys = Object.entries(destinationDefinitions.data as any);
	const bla = locationKeys.find(x => x[0] === locationHash.destinationHash.toString());

	return res.status(StatusCodes.OK).json();
};
