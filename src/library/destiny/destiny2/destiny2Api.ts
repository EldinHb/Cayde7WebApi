import { AxiosResponse } from 'axios';
import { ServerResponse } from '../common';
import { DestinyApi } from '../destinyApi';
import { ManifestResponse } from '../models/manifestResponse';
import { GetProfileParams, GetVendorParams } from './params';

export class Destiny2Api extends DestinyApi {
	private baseUrl = '/platform/destiny2';

	public async getProfile<T>(params: GetProfileParams) {
		return await this.httpClient.get<ServerResponse<T>>(
			`${this.baseUrl}/${params.membershipType}/profile/${params.destinyMembershipId}`,
			{
				params: {
					components: params.components.join(',')
				}
			});
	}

	public async getDestinyManifest(): Promise<AxiosResponse<ServerResponse<ManifestResponse>>> {
		return await this.httpClient({
			url: `/${this.baseUrl}/manifest`
		});
	}

	public async getVendor<T>(params: GetVendorParams) {
		const url = `/${this.baseUrl}` +
			`/${params.membershipType}` +
			'/profile' +
			`/${params.destinyMembershipId}` +
			'/character' +
			`/${params.characterId}` +
			'/vendors' +
			`/${params.vendorHash}`;

		return this.httpClient.get<ServerResponse<T>>(url, {
			params: {
				components: params.components.join(',')
			}
		});
	}
}