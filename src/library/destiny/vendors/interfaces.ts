export interface VendorSales {
	sales: Sales;
}

export interface Vendors {
	vendor: VendorsData;
}

export interface VendorsData {
	data: {
		canPurchase: boolean;
		vendorLocationIndex: number;
		vendorHash: number;
		nextRefreshDate: Date;
		enabled: boolean;
	}
}

export interface Sales {
	data: { [key: string]: Sale }
}

export interface Sale {
	itemHash: number;
	costs: Cost[];
}

export interface Cost {
	itemHash: number;
	quantity: number;
}
