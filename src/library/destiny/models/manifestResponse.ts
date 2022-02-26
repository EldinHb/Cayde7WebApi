import { InventoryItem } from './inventoryItem';

export interface ManifestResponse {
	jsonWorldContentPaths: ManifestLanguages;
	jsonWorldComponentContentPaths: ComponentContentLanguages;
}

export interface ManifestLanguages {
	en: string;
}

export interface ComponentContentLanguages {
	en: ComponentContentPaths;
}

export interface ComponentContentPaths {
	DestinyInventoryItemLiteDefinition: string;
	DestinyInventoryItemDefinition: string;
	DestinyVendorDefinition: string;
	DestinyDestinationDefinition: string;
}

export interface InventoryItems {
	[key: string]: InventoryItem;
}
