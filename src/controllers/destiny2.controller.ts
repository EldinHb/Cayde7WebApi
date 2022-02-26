import { NextFunction, Request, Response } from 'express';

export class Destiny2Controller {
	public static async adaSales(req: Request, res: Response, next: NextFunction) {
		try {
			if (!req.destinyRepository) {
				throw Error('Destiny2 client is not initialized');
			}

			const destinyRepo = req.destinyRepository;
			await destinyRepo.getAdaSales();

			// const membershipData = await client.user.getMembershipsForCurrentUser();
			// const primaryMembership = membershipData
			// 	.data
			// 	.Response
			// 	.destinyMemberships
			// 	.find(x => x.membershipId === membershipData.data.Response.primaryMembershipId);

			// if (!primaryMembership) {
			// 	throw Error('Couldnt find primary membership');
			// }

			// const profile = await client.destiny2.getProfile<CharactersResponse>({
			// 	destinyMembershipId: primaryMembership.membershipId,
			// 	membershipType: primaryMembership.membershipType,
			// 	components: [Components.characters]
			// });

			// const character = profile
			// 	.data
			// 	.Response
			// 	.characters
			// 	.data[Object.keys(profile.data.Response.characters.data)[0]];

			// const ada = await client.destiny2.getVendor<VendorSales>({
			// 	characterId: character.characterId,
			// 	destinyMembershipId: character.membershipId,
			// 	membershipType: character.membershipType,
			// 	vendorHash: VendorHashes.ada,
			// 	components: [Components.vendorSales]
			// });

			// const sales = Object.values(ada.data.Response.sales.data);

			// const mods = sales.flatMap(sale => {
			// 	const item =
			// });
		} catch (err) {
			return next(err);
		}
	}
}
