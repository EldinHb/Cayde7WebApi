import { NextFunction, Request, Response } from 'express';
import { AzureCredentialsStorage } from '../library/storage/azure/azureCredentialsStorage';

export const StorageMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const storageAccount = process.env.STORAGEACCOUNT;
	const tableName = process.env.CREDENTIALSTORAGENAME;

	if (!storageAccount || !tableName) {
		throw Error('Storage environment variables not set!');
	}

	req.credentialsStorage = new AzureCredentialsStorage(storageAccount, tableName);
	next();
};
