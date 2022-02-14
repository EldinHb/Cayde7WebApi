export interface ProfileResponse {
	characters: Characters;
}

export interface Characters {
	data: { [key: string]: CharacterData };
}

export interface CharacterData {
	membershipId: string;
	membershipType: number;
	characterId: string;
}
