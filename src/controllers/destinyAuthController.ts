import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import moment from 'moment';
import { authenticateDestiny } from '../library/destiny/authentication';
import { getCharacters, getDestinyMembershipData } from '../library/destiny/user';
import { saveCredentialsAsync } from '../library/storage/credentialsStorage';

export const authenticate = async (req: Request, res: Response) => {
	const code = req.query.code as string;
	const user = await authenticateDestiny({
		clientId: process.env.DESTINYCLIENTID || '',
		clientSecret: process.env.DESTINYCLIENTSECRET || '',
		code
	});

	if (!user) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Couldnt authenticate');
	}

	await saveCredentialsAsync(req.credentialsStorage, user);
	return res.status(StatusCodes.OK).json(user.access_token);
};

export const testDing = async (req: Request, res: Response) => {
	const start = moment();
	const tes = await getDestinyMembershipData(req.destinyClient);

	const b = tes.Response.destinyMemberships.find(x => x.membershipId === tes.Response.primaryMembershipId);

	if (!b) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Error');
	}

	const bla = await getCharacters(req.destinyClient, {
		membershipId: b.membershipId,
		membershipType: b.membershipType
	});
	const end = moment();
	console.log(end.diff(start, 'ms'));
	return res.status(200).json(bla);
};
