import { NextFunction, Request, Response } from 'express';
import { CredentialsTableStorage } from '../library/storage/credentialsStorage';

export const StorageMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	req.credentialsStorage = CredentialsTableStorage();
	next();
};
