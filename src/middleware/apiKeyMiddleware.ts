import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getApiKey } from '../library/storage/apiKeyStorage';
import { createCredentialsTable } from '../library/storage/client';

export const ApiKeyMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const accountName = process.env.STORAGEACCOUNT;
	const apikey = req.body.apikey as string;
	if (!accountName) {
		throw Error('Account env not set');
	}
	const client = createCredentialsTable(accountName, 'apikeys');
	const entity = await getApiKey(client, apikey);
	if (!entity) {
		return res.status(StatusCodes.UNAUTHORIZED).json('Unauthorized access');
	}

	next();
};
