import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AzureApiKeyStorage } from '../library/storage/azure/azureApiKeyStorage';

export const ApiKeyMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const accountName = process.env.STORAGEACCOUNT;
	const apikey = req.headers.apikey as string;
	if (!apikey) {
		return next('Unauthorized. No apikey provided.');
	}
	if (!accountName) {
		return next('Account env not set');
	}
	const client = new AzureApiKeyStorage(accountName, 'apikeys');
	const entity = await client.getApiKeyAsync(apikey);
	if (!entity) {
		return res.status(StatusCodes.UNAUTHORIZED).json('Unauthorized access');
	}

	next();
};
