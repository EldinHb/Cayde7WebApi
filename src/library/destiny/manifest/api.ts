import { AxiosInstance } from 'axios';

export const getManifest = async (client: AxiosInstance) => {
	const url = '/platform/destiny2/manifest';

	const response = await client.get(url);
	return response;
};
