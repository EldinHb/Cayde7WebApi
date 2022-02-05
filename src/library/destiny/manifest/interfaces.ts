import { InventoryItem } from '../models/inventoryItem';

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
}

export interface InventoryItems {
	[key: string]: InventoryItem;
}