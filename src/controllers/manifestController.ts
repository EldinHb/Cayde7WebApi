import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getManifest, readContentPath } from '../library/destiny/manifest/api';

export const setupManifest = async (req: Request, res: Response) => {
	const manifest = await getManifest(req.destinyClient);
	const manifestUrl = manifest.data.Response.jsonWorldComponentContentPaths.en.DestinyInventoryItemLiteDefinition;
	const data = await readContentPath(req.destinyClient, manifestUrl);
	const items = Object.entries(data.data);
	const ace = items.find(x => x[0] === '347366834');
	return res.status(StatusCodes.OK).json('success');
};
