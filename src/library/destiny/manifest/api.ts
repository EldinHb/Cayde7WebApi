import { AxiosInstance, AxiosResponse } from 'axios';
import { ServerResponse } from '../common';
import { InventoryItems, ManifestResponse } from './interfaces';

type GetManifestResponse = AxiosResponse<ServerResponse<ManifestResponse>>;
export const getManifest = async (client: AxiosInstance): Promise<GetManifestResponse> => {
	const url = '/platform/destiny2/manifest';

	const response = await client.get(url);
	return response;
};

type ReadContentPathResponse = AxiosResponse<InventoryItems>;
export const readContentPath = async (client: AxiosInstance, url: string): Promise<ReadContentPathResponse> => {
	return await client.get(url);
};
