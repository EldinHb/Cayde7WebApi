export interface CharactersResponse {
	characters: Characters;
}

export interface Characters {
	data: { [key: string]: CharacterData };
}

export interface CharacterData {
	membershipId: number;
	membershipType: number;
	characterId: number;
}

export type MembershipResponse = {
	primaryMembershipId: number;
	destinyMemberships: DestinyMembership[];
};

export type DestinyMembership = {
	membershipType: number;
	membershipId: number;
};

export interface VendorSales {
	sales: Sales;
}

export interface Vendors {
	vendor: VendorsData;
}

export interface VendorsData {
	data: {
		canPurchase: boolean;
		vendorLocationIndex: number;
		vendorHash: number;
		nextRefreshDate: Date;
		enabled: boolean;
	}
}

export interface Sales {
	data: { [key: string]: Sale }
}

export interface Sale {
	itemHash: number;
	costs: Cost[];
}

export interface Cost {
	itemHash: number;
	quantity: number;
}
