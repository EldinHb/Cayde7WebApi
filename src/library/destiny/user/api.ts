import { AxiosInstance, AxiosResponse } from 'axios';
import { ServerResponse } from '../common';
import { Components } from '../models/components';
import { MembershipResponse } from '../models/membershipRequest';

export const getDestinyMembershipData =
	async (client: AxiosInstance): Promise<AxiosResponse<ServerResponse<MembershipResponse>>> => {
		const url = '/Platform/User/GetMembershipsForCurrentUser/';
		const response = await client.get(url);
		return response;
	};

export interface GetCharactersParam {
	membershipType: number;
	membershipId: string;
	components: Components[];
}

export const getProfile = async <T>(client: AxiosInstance, param: GetCharactersParam): Promise<AxiosResponse<T>> => {
	const url =
		'/platform' +
		'/destiny2' +
		`/${param.membershipType}` +
		'/profile' +
		`/${param.membershipId}` +
		`/?components=${param.components.join(',')}`;

	const response = await client.get<T>(url);
	return response;
};
