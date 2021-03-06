export interface DestinyLocationResponse {
	[key: string]: DestinyLocation;
}

export interface DestinyLocation {
	displayProperties: DestinyLocationDisplayProperties;
}

export interface DestinyLocationDisplayProperties {
	description: string;
	name: string;
	hasIcon: boolean;
}
