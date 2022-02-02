import axios, { AxiosResponse } from 'axios';
import { URLSearchParams } from 'url';
import { DestinyOAuth } from '../models/destinyOAuth';

export interface AuthenticationConfig {
	clientId: string;
	clientSecret: string;
	/**
	 * Can also be refreshtoken
	 */
	code: string;
}

export async function authenticateDestiny(config: AuthenticationConfig): Promise<AxiosResponse<DestinyOAuth>> {
	const data = new URLSearchParams();
	data.append('grant_type', 'authorization_code');
	data.append('code', config.code);
	data.append('client_id', config.clientId);
	data.append('client_secret', config.clientSecret);

	const response = await axios.post<DestinyOAuth>('https://www.bungie.net/Platform/App/OAuth/token/', {
		data,
		validateStatus: () => true
	});
	return response;
}

export const refreshTokenDestiny = async (config: AuthenticationConfig) => {
	const data = new URLSearchParams();
	data.append('grant_type', 'refresh_token');
	data.append('refresh_token', config.code);
	data.append('client_id', config.clientId);
	data.append('client_secret', config.clientSecret);

	const response = await axios.post<DestinyOAuth>('https://www.bungie.net/Platform/App/OAuth/token/', {
		data,
		validateStatus: () => true
	});

	return response;
};
