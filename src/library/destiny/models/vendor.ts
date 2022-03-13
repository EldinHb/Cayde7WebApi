export interface DestinyVendorDefinitionResponse {
	[key: string]: DestinyVendorDefinition;
}

export interface DestinyVendorDefinition {
	locations: VendorLocation[];
}

export interface VendorLocation {
	destinationHash: number;
	backgroundImagePath: string;
}
