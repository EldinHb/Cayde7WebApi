import axios, { AxiosRequestConfig, AxiosRequestHeaders, Method } from 'axios';
import { URLSearchParams } from 'url';
import { LazyAsync } from '../../util/lazy';
import { CredentialsStorage } from '../storage/credentialsStorage';
import { DestinyOAuth } from './models/destinyOAuth';

const baseUrl = 'https://www.bungie.net';

const getConfig = (
	method: Method,
	token: string,
	headers?: AxiosRequestHeaders
): AxiosRequestConfig => ({
	method,
	headers: {
		'X-API-Key': process.env.DESTINYAPIKEY || '',
		'Authorization': `Bearer ${token}`,
		...headers
	}
});

const authenticateDestiny = async (
	code: string,
	clientId: string,
	clientSecret: string
): Promise<DestinyOAuth | undefined> => {

	const data = new URLSearchParams();
	data.append('grant_type', 'authorization_code');
	data.append('code', code);
	data.append('client_id', clientId);
	data.append('client_secret', clientSecret);

	try {
		const response = await axios(baseUrl + '/Platform/App/OAuth/token/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data,
			//validateStatus: () => true // dont throw error on 4xx or 5xx
		});
		const user: DestinyOAuth = response.data;
		user.partitionKey = user.membership_id;
		user.rowKey = user.token_type;

		return user;
	} catch (err) {
		console.log(err);
		return undefined;
	}
};

const refreshDestinyToken = async (
	refreshToken: string,
	clientId: string,
	clientSecret: string
): Promise<DestinyOAuth | undefined> => {
	const data = new URLSearchParams();
	data.append('grant_type', 'refresh_token');
	data.append('refresh_token', refreshToken);
	data.append('client_id', clientId);
	data.append('client_secret', clientSecret);

	try {
		const response = await axios(baseUrl + '/Platform/App/OAuth/token/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data
		});

		return response.data;
	} catch (err) {
		console.log(err);
		return undefined;
	}
};

const getMembershipData = async (accessToken: string) => {
	const url = baseUrl + '/Platform/User/GetMembershipsForCurrentUser/';
	try {
		const response = await axios(url, getConfig('GET', accessToken));
		return response.data;
	} catch (err) {
		console.log(err);
		return undefined;
	}
};

export type DestinyApi = {
	authenticate: (code: string) => Promise<DestinyOAuth | undefined>;
	refreshToken: (refreshToken: string) => Promise<DestinyOAuth | undefined>;
	getMemberShipData: () => Promise<void>;
};
export const DestinyApi = (storage: CredentialsStorage): DestinyApi => {
	const user = new LazyAsync<DestinyOAuth>(async () => {
		return await storage.getUserAsync();
	});

	const clientId = process.env.DESTINYCLIENTID || '';
	const clientSecret = process.env.DESTINYCLIENTSECRET || '';

	return {
		authenticate: async (code: string) => {
			return await authenticateDestiny(code, clientId, clientSecret);
		},
		refreshToken: async (refreshToken: string) => {
			return await refreshDestinyToken(refreshToken, clientId, clientSecret);
		},
		getMemberShipData: async () => {
			return await getMembershipData((await user.value()).access_token);
		}
	};
};
