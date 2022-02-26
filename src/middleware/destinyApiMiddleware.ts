import { NextFunction, Request, Response } from 'express';
import moment from 'moment';
import { DestinyClient } from '../library/destiny/destinyClient';
import { createHttpClient } from '../library/destiny/destinyHttpClient';
import { DestinyRepository } from '../library/destiny/destinyRepository';
import { DestinyOAuth } from '../library/destiny/models/destinyOAuth';
import { CredentialsStorage } from '../library/storage/credentialsStorage';

export const DestinyApiMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.credentialsStorage) {
		throw Error('Use me after credentialsstorage middleware!');
	}

	const user = await req.credentialsStorage.getCredentialsAsync();

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

	req.destiny2Client = new DestinyClient(apiKey, destinyUser.access_token);
	req.destinyRepository = new DestinyRepository(req.destiny2Client);
	next();
};

const refreshToken = async (refreshToken: string, storage: CredentialsStorage): Promise<DestinyOAuth> => {
	const refreshedUser = await DestinyClient.refreshToken({
		clientId: process.env.DESTINYCLIENTID || '',
		clientSecret: process.env.DESTINYCLIENTSECRET || '',
		code: refreshToken
	});

	if (!refreshedUser) {
		throw Error('something went wrong while refreshing token!');
	}

	await storage.saveCredentialsAsync(refreshedUser.data);
	return refreshedUser.data;
};
