export interface DestinyVendorDefinition {
	locations: VendorLocation[];
}

export interface VendorLocation {
	destinationHash: number;
	backgroundImagePath: string;
}
