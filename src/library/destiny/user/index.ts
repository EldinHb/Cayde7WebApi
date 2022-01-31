import { AxiosInstance } from 'axios';
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
}

export const getCharacters = async (client: AxiosInstance, param: GetCharactersParam): Promise<any> => {
	const url =
		'/platform' +
		'/destiny2' +
		`/${param.membershipType}` +
		'/profile' +
		`/${param.membershipId}/?components=200`;

	const response = await client({
		method: 'GET',
		url
	});

	return response.data;
};
