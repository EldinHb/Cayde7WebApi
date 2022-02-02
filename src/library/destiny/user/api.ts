import { AxiosInstance } from 'axios';
import { Components } from '../models/components';
import { MembershipRequest } from '../models/membershipRequest';

export const getDestinyMembershipData = async (client: AxiosInstance): Promise<MembershipRequest> => {
	const url = '/Platform/User/GetMembershipsForCurrentUser/';
	const response = await client({
		url,
		method: 'GET'
	});
	return response.data;
};

export interface GetCharactersParam {
	membershipType: number;
	membershipId: string;
	components: Components[];
}

export const getProfile = async <T>(client: AxiosInstance, param: GetCharactersParam): Promise<T> => {
	const url =
		'/platform' +
		'/destiny2' +
		`/${param.membershipType}` +
		'/profile' +
		`/${param.membershipId}` +
		`/?components=${param.components.join(',')}`;

	const response = await client({
		method: 'GET',
		url
	});

	return response.data;
};
