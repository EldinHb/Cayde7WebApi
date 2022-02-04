import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { authenticateDestiny } from '../library/destiny/authentication';
import { isSuccesStatusCode } from '../library/httpHelpers';
import { saveCredentialsAsync } from '../library/storage/credentialsStorage';

export const authenticate = async (req: Request, res: Response) => {
	const code = req.query.code as string;
	const userResponse = await authenticateDestiny({
		clientId: process.env.DESTINYCLIENTID || '',
		clientSecret: process.env.DESTINYCLIENTSECRET || '',
		code
	});

	if (!isSuccesStatusCode(userResponse)) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Couldnt authenticate');
	}

	await saveCredentialsAsync(req.credentialsStorage, userResponse.data);
	return res.status(StatusCodes.OK).json(userResponse.data.access_token);
};
