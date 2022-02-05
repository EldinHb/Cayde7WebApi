export interface InventoryItem {
	displayProperties: DisplayProperties;
	itemTypeDisplayName: string;
}

export interface DisplayProperties {
	description: string;
	name: string;
	icon: string;
	hasIcon: boolean;
}
