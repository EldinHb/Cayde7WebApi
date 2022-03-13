export interface InventoryItem {
	displayProperties: DisplayProperties;
	itemTypeDisplayName: string;
	itemType: number;
	summaryItemHash?: number;
	inventory?: ItemInventory;
}

export interface DisplayProperties {
	description: string;
	name: string;
	icon: string;
	hasIcon: boolean;
}

export interface ItemInventory {
	tierTypeHash: number;
	bucketTypeHash: number;
}
