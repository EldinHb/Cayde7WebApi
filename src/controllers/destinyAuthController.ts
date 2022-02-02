import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { authenticateDestiny } from '../library/destiny/authentication';
import { Components } from '../library/destiny/models/components';
import { ItemHashes } from '../library/destiny/models/itemHashes';
import { ProfileRequest } from '../library/destiny/models/profileRequest';
import { VendorHashes } from '../library/destiny/models/vendorHashes';
import { getDestinyMembershipData, getProfile } from '../library/destiny/user';
import { VendorSalesRequest } from '../library/destiny/vendors';
import { getVendor } from '../library/destiny/vendors/api';
import { saveCredentialsAsync } from '../library/storage/credentialsStorage';

export const authenticate = async (req: Request, res: Response) => {
	const code = req.query.code as string;
	const user = await authenticateDestiny({
		clientId: process.env.DESTINYCLIENTID || '',
		clientSecret: process.env.DESTINYCLIENTSECRET || '',
		code
	});

	if (!user) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Couldnt authenticate');
	}

	await saveCredentialsAsync(req.credentialsStorage, user);
	return res.status(StatusCodes.OK).json(user.access_token);
};

export const testDing = async (req: Request, res: Response) => {
	const tes = await getDestinyMembershipData(req.destinyClient);

	const b = tes.Response.destinyMemberships.find(x => x.membershipId === tes.Response.primaryMembershipId);

	if (!b) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Error');
	}

	const bla = await getProfile<ProfileRequest>(req.destinyClient, {
		membershipId: b.membershipId,
		membershipType: b.membershipType,
		components: [Components.characters]
	});

	const te = Object.keys(bla.Response.characters.data);
	const firstCharacter = bla.Response.characters.data[te[0]];

	const gru = await getVendor<VendorSalesRequest>(req.destinyClient, {
		membershipId: b.membershipId,
		membershipType: b.membershipType,
		components: [Components.vendorSales],
		characterId: firstCharacter.characterId,
		vendorHash: VendorHashes.ada
	});

	const gruKeys = Object.entries(gru.Response.sales.data);
	const mods = gruKeys.flatMap(([_, sale]) => {
		if (sale.costs.find(x => x.itemHash === ItemHashes.modComponents)) {
			return sale;
		}

		return [];
	});

	console.log(mods);
	return res.status(200).json(bla);
};
