import { AxiosInstance, AxiosResponse } from 'axios';
import { Sales, VendorsData } from '.';
import { isSuccesStatusCode } from '../../httpHelpers';
import { ServerResponse } from '../common';
import { Components } from '../models/components';
import { ProfileResponse } from '../models/profileRequest';
import { VendorHashes } from '../models/vendorHashes';
import { getDestinyMembershipData, getFirstCharacter, getProfile } from '../user/api';
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

	const saleKeys = Object.values(adaSales.data.Response.sales.data);

	return saleKeys;
};

export const getXurSalesAndLocation = async (client: AxiosInstance) => {
	const firstCharacter = await getFirstCharacter(client);

	const xur = await getVendor<ServerResponse<{
		vendor: VendorsData,
		sales: Sales
	}>>(client, {
		characterId: firstCharacter.characterId,
		membershipId: firstCharacter.membershipId,
		membershipType: firstCharacter.membershipType,
		vendorHash: VendorHashes.xur,
		components: [
			Components.vendorSales,
			Components.vendors
		]
	});

	return xur;
};
