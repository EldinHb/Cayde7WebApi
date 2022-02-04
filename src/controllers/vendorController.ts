import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getAdaModSales } from '../library/destiny/vendors';
import { createErrorMessage } from '../library/httpHelpers';

export const sendAdaSale = async (req: Request, res: Response) => {
	try {
		const mods = await getAdaModSales(req.destinyClient);
		return res.status(200).json(mods);
	} catch (err) {
		if (err instanceof Error) {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(createErrorMessage(err.message));
		}

		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
	}
};
