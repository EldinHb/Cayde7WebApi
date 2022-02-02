export type MembershipResponse = {
	primaryMembershipId: string;
	destinyMemberships: DestinyMembership[];
};

export type DestinyMembership = {
	membershipType: number;
	membershipId: string;
};
