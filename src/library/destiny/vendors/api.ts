import { AxiosInstance, AxiosResponse } from 'axios';
import { isSuccesStatusCode } from '../../httpHelpers';
import { ServerResponse } from '../common';
import { Components } from '../models/components';
import { ItemHashes } from '../models/itemHashes';
import { ProfileResponse } from '../models/profileRequest';
import { VendorHashes } from '../models/vendorHashes';
import { getDestinyMembershipData, getProfile } from '../user/api';
import { VendorSales } from './interfaces';

interface VendorParam {
	characterId: string;
	membershipId: string;
	membershipType: number;
	vendorHash: string;
	components: Components[];
}
export const getVendor = async <T>(client: AxiosInstance, param: VendorParam): Promise<AxiosResponse<T>> => {
	const url =
		'/platform' +
		'/destiny2' +
		`/${param.membershipType}` +
		'/profile' +
		`/${param.membershipId}` +
		'/character' +
		`/${param.characterId}` +
		'/vendors' +
		`/${param.vendorHash}` +
		`/?components=${param.components.join(',')}`;

	const response = await client.get<T>(url);
	return response;
};

export const getAdaModSales = async (client: AxiosInstance) => {
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

	const adaSales = await getVendor<ServerResponse<VendorSales>>(client, {
		membershipId: membership.membershipId,
		membershipType: membership.membershipType,
		components: [Components.vendorSales],
		characterId: firstCharacter.characterId,
		vendorHash: VendorHashes.ada
	});

	const saleKeys = Object.entries(adaSales.data.Response.sales.data);
	const mods = saleKeys.flatMap(([_, sale]) => {
		if (sale.costs.find(x => x.itemHash === ItemHashes.modComponents)) {
			return sale;
		}

		return [];
	});

	return mods;
};
