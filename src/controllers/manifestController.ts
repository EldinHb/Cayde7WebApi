import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getManifest } from '../library/destiny/manifest/api';

export const setupManifest = async (req: Request, res: Response) => {
	const manifest = await getManifest(req.destinyClient);
	return res.status(StatusCodes.OK).json('success');
};
