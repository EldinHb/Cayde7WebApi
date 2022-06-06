import { NextFunction, Request, Response } from 'express';
import { JsonCredentialsStorage } from '../library/storage/jsonStorage/jsonApiKeyStorage';

export const StorageMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const storageAccount = process.env.STORAGEACCOUNT;
	const tableName = process.env.CREDENTIALSTORAGENAME;

	if (!storageAccount || !tableName) {
		throw Error('Storage environment variables not set!');
	}

	req.credentialsStorage = new JsonCredentialsStorage();
	next();
};
