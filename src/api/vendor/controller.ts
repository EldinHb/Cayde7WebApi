import { EmbedField } from 'discord.js';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class VendorController {
	public static async adaSale(req: Request, res: Response, next: NextFunction) {
		try {
			if (!req.destinyRepository) {
				throw Error('DestinyRepository was not initialized');
			}

			if (!req.discordClient) {
				throw Error('Discord was not initialized');
			}

			const adaSales = await req.destinyRepository.getAdaSales();
			const mods = await req.destinyRepository.getModsFromSales(adaSales);
			const fields: EmbedField[] = mods.map(mod => ({
				name: mod.displayProperties.name,
				value: mod.itemTypeDisplayName,
				inline: true
			}));

			req.discordClient.sendMessage('Ada mods of the day', fields, 'FUCHSIA');

			return res.status(StatusCodes.OK).json(mods);
		} catch (err) {
			return next(err);
		}
	}

	public static async xur(req: Request, res: Response, next: NextFunction) {
		try {
			if (!req.destinyRepository) {
				throw Error('destiny repository not initialized');
			}

			if (!req.discordClient) {
				throw Error('Discord client not setup. How did this happen?');
			}

			const data = await req.destinyRepository.getXurSalesAndLocation();

			const saleFields: EmbedField[] = data.sales.map(sale => ({
				inline: false,
				name: sale.displayProperties.name,
				value: '-'
			}));

			const fields: EmbedField[] = [
				{
					name: data.destination.name,
					value: getDropZone(data.destination.name),
					inline: true
				},
				...saleFields
			];

			req.discordClient.sendMessage('Where is Xur?', fields, 'GOLD');

			return res.status(StatusCodes.OK).json('success');
		} catch (err) {
			return next(err);
		}
	}
}

const getDropZone = (name: string) => {
	switch (name.toLowerCase()) {
		case 'european dead zone':
			return 'Winding Cove';
		case 'arcadian valley':
			return 'Watcher\'s Grave';
		default:
			return 'The Hangar';
	}
};
