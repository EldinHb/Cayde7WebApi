import { AxiosResponse } from 'axios';
import { ServerResponse } from '../common';
import { DestinyApi } from '../destinyApi';
import { MembershipResponse } from '../models/responses';
import { GetProfileParams, GetVendorParams } from './params';

export class Destiny2Api extends DestinyApi {
	private baseUrl = '/platform/destiny2';

	public async getProfile<T>(params: GetProfileParams) {
		return this.httpClient.get<ServerResponse<T>>(
			`/${this.baseUrl}/${params.membershipType}/profile/${params.destinyMembershipId}`,
			{
				params: params.components.join(',')
			});
	}

	public async getDestinyManifest(): Promise<AxiosResponse<ServerResponse<MembershipResponse>>> {
		return this.httpClient({
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
			params: params.components.join(',')
		});
	}
}
