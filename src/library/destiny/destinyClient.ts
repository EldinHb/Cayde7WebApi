import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { URLSearchParams } from 'url';
import { SimpleCache } from '../cache/simpleCache';
import { Destiny2Api } from './destiny2/destiny2Api';
import { AuthenticationConfig } from './models/authenticationConfig';
import { DestinyUserApi } from './user/destinyUserApi';

export interface IDestinyClient {
	user: DestinyUserApi;
	destiny2: Destiny2Api;
}

export interface IDestiny2Authentication {
	authenticate: (config: AuthenticationConfig) => Promise<AxiosResponse>;
	refreshToken: (config: AuthenticationConfig) => Promise<AxiosResponse>;
}

export const Destiny2Authentication: IDestiny2Authentication = {
	authenticate: async (config: AuthenticationConfig) => {
		const data = new URLSearchParams();
		data.append('grant_type', 'authorization_code');
		data.append('code', config.code);
		data.append('client_id', config.clientId);
		data.append('client_secret', config.clientSecret);

		const response = await axios('https://www.bungie.net/Platform/App/OAuth/token/', {
			data,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			method: 'POST'
		});
		return response;
	},
	refreshToken: async (config: AuthenticationConfig) => {
		const data = new URLSearchParams();
		data.append('grant_type', 'refresh_token');
		data.append('refresh_token', config.code);
		data.append('client_id', config.clientId);
		data.append('client_secret', config.clientSecret);

		try {
			const response = await axios('https://www.bungie.net/Platform/App/OAuth/token/', {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data,
				method: 'POST'
			});

			return response;
		} catch (err) {
			const response = await axios('https://www.bungie.net/Platform/App/OAuth/token/', {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data,
				method: 'POST'
			});

			return response;
		}
	}
};

export class DestinyClient implements IDestinyClient {
	private readonly httpClient: AxiosInstance;

	public readonly apiKey: string;

	public readonly accessToken: string;

	private readonly cache = new SimpleCache();

	constructor(apiKey: string, accessToken: string) {
		this.httpClient = axios.create({
			baseURL: 'https://www.bungie.net',
			headers: {
				'X-API-Key': apiKey,
				Authorization: `Bearer ${accessToken}`
			}
		});

		this.apiKey = apiKey;
		this.accessToken = accessToken;
	}

	private _user?: DestinyUserApi;
	public get user() {
		if (!this._user) {
			this._user = new DestinyUserApi(this.httpClient, this.cache);
		}

		return this._user;
	}

	private _destiny2?: Destiny2Api;
	public get destiny2() {
		if (!this._destiny2) {
			this._destiny2 = new Destiny2Api(this.httpClient, this.cache);
		}

		return this._destiny2;
	}
}
