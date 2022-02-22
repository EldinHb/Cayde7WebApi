import axios, { AxiosInstance } from 'axios';
import { authenticateDestiny, AuthenticationConfig, refreshTokenDestiny } from './authentication';
import { Destiny2Api } from './destiny2/destiny2Api';
import { DestinyUserApi } from './user/destinyUserApi';

export class DestinyClient {
	private readonly httpClient: AxiosInstance;

	constructor(apiKey: string, accessToken: string) {
		this.httpClient = axios.create({
			baseURL: 'https://www.bungie.net',
			headers: {
				'X-API-Key': apiKey,
				'Authorization': `Bearer ${accessToken}`
			},
		});
	}

	private _user?: DestinyUserApi;
	public get user() {
		if (!this._user) {
			this._user = new DestinyUserApi(this.httpClient);
		}

		return this._user;
	}

	private _destiny2?: Destiny2Api;
	public get destiny2() {
		if (!this._destiny2) {
			this._destiny2 = new Destiny2Api(this.httpClient);
		}

		return this._destiny2;
	}

	public static async authenticate(config: AuthenticationConfig) {
		return authenticateDestiny(config);
	}

	public static async refreshToken(config: AuthenticationConfig) {
		return refreshTokenDestiny(config);
	}
}
