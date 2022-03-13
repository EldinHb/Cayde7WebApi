import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Destiny2Authentication } from '../../library/destiny/destinyClient';
import { isSuccesStatusCode } from '../../library/httpHelpers';

export class Destiny2Controller {
	public static async login(req: Request, res: Response, next: NextFunction) {
		try {
			if (!req.credentialsStorage) {
				return next('Credentialsstorage not initialized');
			}

			const code = req.query.code as string;
			const user = await Destiny2Authentication.authenticate({
				clientId: process.env.DESTINYCLIENTID ?? '',
				clientSecret: process.env.DESTINYCLIENTSECRET ?? '',
				code
			});

			if (!isSuccesStatusCode(user)) {
				return next('Couldnt authenticate');
			}

			await req.credentialsStorage.saveCredentialsAsync(user.data);

			return res.status(StatusCodes.OK).json('success');
		} catch (err) {
			return next(err);
		}
	}
}
