import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CredentialsTableStorage } from '../library/storage/credentialsStorage';

export const authenticate = async (req: Request, res: Response) => {
	const code = req.query.code as string;

	const destinyOauth = await req.destinyApi?.authenticate(code);

	if (!destinyOauth) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Couldnt authenticate');
	}

	await CredentialsTableStorage().setUserAsync(destinyOauth);
	return res.status(StatusCodes.OK).json(destinyOauth?.access_token);
};

export const testDing = async (req: Request, res: Response) => {
	const data = await req.destinyApi?.getMemberShipData();
	return res.status(200).json(data);
};
