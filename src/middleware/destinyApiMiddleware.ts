import { NextFunction, Request, Response } from 'express';
import { DestinyApi } from '../library/destiny/destinyApi';

export const DestinyApiMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.credentialsStorage) {
		throw Error('Use me after credentialsstorage middleware!');
	}
	req.destinyApi = DestinyApi(req.credentialsStorage);
	next();
};
