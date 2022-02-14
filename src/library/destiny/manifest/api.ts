import { AxiosInstance, AxiosResponse } from 'axios';
import { ServerResponse } from '../common';
import { ManifestResponse } from './interfaces';

type GetManifestResponse = AxiosResponse<ServerResponse<ManifestResponse>>;
export const getManifest = async (client: AxiosInstance): Promise<GetManifestResponse> => {
	const url = '/platform/destiny2/manifest';

	const response = await client.get(url);
	return response;
};

type ReadContentPathResponse<T> = AxiosResponse<T>;
export const readContentPath = async <T>(client: AxiosInstance, url: string): Promise<ReadContentPathResponse<T>> => {
	return await client.get(url);
};
