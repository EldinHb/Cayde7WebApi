import axios from 'axios';

export interface DestinyApiConfig {
	apiKey: string;
	accessToken?: string;
}

export function createHttpClient(config: DestinyApiConfig) {
	return axios.create({
		baseURL: 'https://www.bungie.net',
		headers: {
			'X-API-Key': config.apiKey,
			'Authorization': `Bearer ${config.accessToken}`
		},
		validateStatus: () => true
	});
}
