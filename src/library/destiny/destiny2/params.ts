import { Components } from '../models/components';
import { VendorHashes } from '../models/vendorHashes';

export interface GetVendorParams {
	membershipType: number;
	destinyMembershipId: number;
	characterId: number;
	vendorHash: VendorHashes;
	components: Components[];
}

export interface GetProfileParams {
	membershipType: number;
	destinyMembershipId: number;
	components: Components[];
}
