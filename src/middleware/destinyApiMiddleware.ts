import { TableClient } from '@azure/data-tables';
import { NextFunction, Request, Response } from 'express';
import moment from 'moment';
import { refreshTokenDestiny } from '../library/destiny/authentication';
import { createHttpClient } from '../library/destiny/destinyHttpClient';
import { DestinyOAuth } from '../library/destiny/models/destinyOAuth';
import { getCredentialsAsync, saveCredentialsAsync } from '../library/storage/credentialsStorage';

export const DestinyApiMiddleware = async (req: Request, res: Response, next: NextFunction) => {

	if (!req.credentialsStorage) {
		throw Error('Use me after credentialsstorage middleware!');
	}
	const start = moment();
	const user = await getCredentialsAsync(req.credentialsStorage);
	const end = moment();

	console.log(end.diff(start, 'ms'));
	const timestamp = moment(user.timestamp).add(user.expires_in, 'seconds');
	const now = moment();
	const destinyUser = timestamp.isBefore(now) ?
		await refreshToken(user.refresh_token, req.credentialsStorage) :
		user;

	const apiKey = process.env.DESTINYAPIKEY;

	if (!apiKey) {
		console.log('API KEY not set in environment variables!');
		throw Error('API KEY not set in environment variables!');
	}

	req.destinyUser = destinyUser;
	req.destinyClient = createHttpClient({
		apiKey,
		accessToken: destinyUser.access_token
	});

	next();
};

const refreshToken = async (refreshToken: string, storage: TableClient): Promise<DestinyOAuth> => {
	const refreshedUser = await refreshTokenDestiny({
		clientId: process.env.DESTINYCLIENTID || '',
		clientSecret: process.env.DESTINYCLIENTSECRET || '',
		code: refreshToken
	});
	await saveCredentialsAsync(storage, refreshedUser);
	return refreshedUser;
};
