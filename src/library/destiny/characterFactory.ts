import { DestinyClient } from './destinyClient';
import { Components } from './models/components';
import { Characters, CharactersResponse } from './models/responses';

export class CharactersFactory {

	constructor(private readonly client: DestinyClient) { }

	private _characters?: Characters;
	/**
	 * Gets the profile by first getting membershipdata and then profile data.
	 * The result gets cached for the lifecycle of this object.
	 * @param refresh - get without cache
	 * @returns users characters
	 */
	public async getCharacters(refresh = false): Promise<Characters> {
		if (this._characters && !refresh) {
			return this._characters;
		}

		const membershipData = await this.client.user.getMembershipsForCurrentUser();
		const primaryMembership = membershipData
			.data
			.Response
			.destinyMemberships
			.find(x => x.membershipId === membershipData.data.Response.primaryMembershipId);

		if (!primaryMembership) {
			throw Error('Couldnt find primary membership');
		}

		const profile = await this.client.destiny2.getProfile<CharactersResponse>({
			destinyMembershipId: primaryMembership.membershipId,
			membershipType: primaryMembership.membershipType,
			components: [Components.characters]
		});

		if (!profile) {
			throw Error('Couldnt find characters');
		}

		this._characters = profile.data.Response.characters;

		return this._characters;
	}
}
