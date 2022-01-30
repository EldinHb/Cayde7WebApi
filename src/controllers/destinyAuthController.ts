import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { authenticateDestiny } from '../library/destiny/destinyApi';
import { CredentialsTableStorage } from '../library/storage/credentialsStorage';

export const authenticate = async (req: Request, res: Response) => {
	const code = req.query.code as string;
	const clientSecret = process.env.DESTINYCLIENTSECRET;
	const clientId = process.env.DESTINYCLIENTID;

	if (!clientId || !clientSecret) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Environment variables not set');
	}

	const destinyOauth = await authenticateDestiny(code, clientId, clientSecret);

	if (!destinyOauth) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Couldnt authenticate');
	}

	await CredentialsTableStorage().setUserAsync(destinyOauth);
	return res.status(StatusCodes.OK).json(destinyOauth?.access_token);
};
