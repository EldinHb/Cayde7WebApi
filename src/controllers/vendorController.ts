import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getManifest, readContentPath } from '../library/destiny/manifest/api';
import { getAdaModSales } from '../library/destiny/vendors';
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

		const inventoryItems = await readContentPath(req.destinyClient, manifestUrl);
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
