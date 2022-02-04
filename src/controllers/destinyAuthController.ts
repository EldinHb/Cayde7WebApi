import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { authenticateDestiny } from '../library/destiny/authentication';
import { ServerResponse } from '../library/destiny/common';
import { Components } from '../library/destiny/models/components';
import { ItemHashes } from '../library/destiny/models/itemHashes';
import { ProfileResponse } from '../library/destiny/models/profileRequest';
import { VendorHashes } from '../library/destiny/models/vendorHashes';
import { getDestinyMembershipData, getProfile } from '../library/destiny/user';
import { VendorSales } from '../library/destiny/vendors';
import { getVendor } from '../library/destiny/vendors/api';
import { isSuccesStatusCode } from '../library/httpHelpers';
import { saveCredentialsAsync } from '../library/storage/credentialsStorage';

export const authenticate = async (req: Request, res: Response) => {
	const code = req.query.code as string;
	const userResponse = await authenticateDestiny({
		clientId: process.env.DESTINYCLIENTID || '',
		clientSecret: process.env.DESTINYCLIENTSECRET || '',
		code
	});

	if (!isSuccesStatusCode(userResponse)) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Couldnt authenticate');
	}

	await saveCredentialsAsync(req.credentialsStorage, userResponse.data);
	return res.status(StatusCodes.OK).json(userResponse.data.access_token);
};

export const testDing = async (req: Request, res: Response) => {
	const membershipData = await getDestinyMembershipData(req.destinyClient);

	if (!isSuccesStatusCode(membershipData)) {
		return res.status(StatusCodes.BAD_REQUEST).json('error getting membershipdata');
	}

	const membership = membershipData
		.data
		.Response
		.destinyMemberships
		.find(x => x.membershipId === membershipData.data.Response.primaryMembershipId);

	if (!membership) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Error find primary membership');
	}

	const profile = await getProfile<ServerResponse<ProfileResponse>>(req.destinyClient, {
		membershipId: membership.membershipId,
		membershipType: membership.membershipType,
		components: [Components.characters]
	});

	const profileKeys = Object.keys(profile.data.Response.characters.data);
	const firstCharacter = profile.data.Response.characters.data[profileKeys[0]];

	const adaSales = await getVendor<ServerResponse<VendorSales>>(req.destinyClient, {
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

	return res.status(200).json(mods);
};
