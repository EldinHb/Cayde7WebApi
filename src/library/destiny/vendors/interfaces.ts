export interface VendorSales {
	sales: Sales;
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
