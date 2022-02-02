export interface ProfileRequest {
	Response: ProfileResponse;
}

export interface ProfileResponse {
	characters: Characters;
}

export interface Characters {
	data: { [key: string]: Data };
}

export interface Data {
	membershipId: string;
	membershipType: string;
	characterId: string;
}
