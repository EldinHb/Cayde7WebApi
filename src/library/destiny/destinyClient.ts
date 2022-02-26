import axios, { AxiosInstance } from 'axios';
import { URLSearchParams } from 'url';
import { Destiny2Api } from './destiny2/destiny2Api';
import { AuthenticationConfig } from './models/authenticationConfig';
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
	}

	public static async refreshToken(config: AuthenticationConfig) {
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
			console.log(err);
			return;
		}
	}
}
