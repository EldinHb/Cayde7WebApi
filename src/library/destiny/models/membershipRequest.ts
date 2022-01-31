export type MembershipRequest = {
	Response: MembershipResponse;
};

export type MembershipResponse = {
	primaryMembershipId: string;
	destinyMemberships: DestinyMembership[];
};

export type DestinyMembership = {
	membershipType: number;
	membershipId: string;
};
