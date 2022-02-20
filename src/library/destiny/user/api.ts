import { AxiosInstance, AxiosResponse } from 'axios';
import { isSuccesStatusCode } from '../../httpHelpers';
import { ServerResponse } from '../common';
import { Components } from '../models/components';
import { MembershipResponse } from '../models/membershipRequest';
import { CharacterData, ProfileResponse } from '../models/profileRequest';

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

export const getFirstCharacter = async (client: AxiosInstance): Promise<CharacterData> => {
	const membershipData = await getDestinyMembershipData(client);

	if (!isSuccesStatusCode(membershipData)) {
		throw Error('bad request');
	}

	const membership = membershipData
		.data
		.Response
		.destinyMemberships
		.find(x => x.membershipId === membershipData.data.Response.primaryMembershipId);

	if (!membership) {
		throw Error('bad request');
	}

	const profile = await getProfile<ServerResponse<ProfileResponse>>(client, {
		membershipId: membership.membershipId,
		membershipType: membership.membershipType,
		components: [Components.characters]
	});

	const profileKeys = Object.keys(profile.data.Response.characters.data);
	const firstCharacter = profile.data.Response.characters.data[profileKeys[0]];
	return firstCharacter;
};
