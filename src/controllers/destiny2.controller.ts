import { NextFunction, Request, Response } from 'express';
import { Components } from '../library/destiny/models/components';
import { CharactersResponse, VendorSales } from '../library/destiny/models/responses';
import { VendorHashes } from '../library/destiny/models/vendorHashes';

export class Destiny2Controller {
	public async adaSales(req: Request, res: Response, next: NextFunction) {
		try {
			if (!req.destiny2Client) {
				throw Error('Destiny2 client is not initialized');
			}

			const client = req.destiny2Client;

			const membershipData = await client.destiny2.getDestinyManifest();
			const primaryMembership = membershipData
				.data
				.Response
				.destinyMemberships
				.find(x => x.membershipId === membershipData.data.Response.primaryMembershipId);

			if (!primaryMembership) {
				throw Error('Couldnt find primary membership');
			}

			const profile = await client.destiny2.getProfile<CharactersResponse>({
				destinyMembershipId: primaryMembership.membershipId,
				membershipType: primaryMembership.membershipType,
				components: [Components.characters]
			});

			const character = profile
				.data
				.Response
				.characters
				.data[Object.keys(profile.data.Response.characters.data)[0]];

			const ada = await client.destiny2.getVendor<VendorSales>({
				characterId: character.characterId,
				destinyMembershipId: character.membershipId,
				membershipType: character.membershipType,
				vendorHash: VendorHashes.ada,
				components: [Components.vendorSales]
			});


		} catch (err) {
			return next(err);
		}
	}
}
