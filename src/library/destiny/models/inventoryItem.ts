export interface InventoryItem {
	displayProperties: DisplayProperties;
	itemTypeDisplayName: string;
	itemType: number;
}

export interface DisplayProperties {
	description: string;
	name: string;
	icon: string;
	hasIcon: boolean;
}
