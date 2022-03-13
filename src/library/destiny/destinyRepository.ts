import { isSuccesStatusCode } from '../httpHelpers';
import { IDestinyClient } from './destinyClient';
import { BucketTypeHash } from './models/bucketTypeHash';
import { Components } from './models/components';
import { DestinyLocationDisplayProperties, DestinyLocationResponse } from './models/destinyLocation';
import { InventoryItem } from './models/inventoryItem';
import { ItemType } from './models/itemTypes';
import { InventoryItems } from './models/manifestResponse';
import { CharactersResponse, Sale, Sales, VendorSales, VendorsData } from './models/responses';
import { TierTypeHash } from './models/tierTypeHash';
import { DestinyVendorDefinitionResponse } from './models/vendor';
import { VendorHashes } from './models/vendorHashes';

export interface IDestinyRepository {
	getAdaSales(): Promise<{ [key: string]: Sale }>;
	getModsFromSales(sales: { [key: string]: Sale }): Promise<InventoryItem[]>;
	getXurSalesAndLocation: () => Promise<{
		destination: DestinyLocationDisplayProperties,
		sales: InventoryItem[]
	}>;
}

export class DestinyRepository implements IDestinyRepository {
	public readonly destinyClient: IDestinyClient;

	constructor(client: IDestinyClient) {
		this.destinyClient = client;
	}

	public async getFirstCharacter() {
		const membershipData = await this.destinyClient.user.getMembershipsForCurrentUser();

		if (!isSuccesStatusCode(membershipData)) {
			throw Error('Couldnt find membershipdata');
		}

		const membership = membershipData
			.data
			.Response
			.destinyMemberships
			.find(x => x.membershipId === membershipData.data.Response.primaryMembershipId);

		if (!membership) {
			throw Error('Couldnt find primarymembership');
		}

		const profile = await this.destinyClient.destiny2.getProfile<CharactersResponse>({
			components: [Components.characters],
			destinyMembershipId: membership.membershipId,
			membershipType: membership.membershipType
		});

		const characterIds = Object.keys(profile.data.Response.characters.data);
		const firstCharacter = profile.data.Response.characters.data[characterIds[0]];
		return firstCharacter;
	}

	public async getXurSalesAndLocation() {
		const firstCharacter = await this.getFirstCharacter();

		const xur = await this.destinyClient.destiny2.getVendor<{
			vendor: VendorsData,
			sales: Sales
		}>({
			characterId: firstCharacter.characterId,
			destinyMembershipId: firstCharacter.membershipId,
			membershipType: firstCharacter.membershipType,
			vendorHash: VendorHashes.xur,
			components: [
				Components.vendorSales,
				Components.vendors
			]
		});

		const destination = await this.getXurLocation(xur.data.Response.vendor.data.vendorLocationIndex);
		const sales = await this.findSaleDefinitionAndFilterExotic(Object.values(xur.data.Response.sales.data));
		return {
			destination,
			sales
		};
	}

	private async findSaleDefinitionAndFilterExotic(sales: Sale[]) {
		const manifest = await this.destinyClient.destiny2.getDestinyManifest();
		const itemManifestUrl = manifest
			.data
			.Response
			.jsonWorldComponentContentPaths
			.en
			.DestinyInventoryItemLiteDefinition;

		const inventoryDefinitions = await this.destinyClient
			.destiny2
			.readContentPath<InventoryItems>(itemManifestUrl);
		const inventoryItemsEntries = Object.entries(inventoryDefinitions.data);

		const isExotic = (item: InventoryItem) => {
			return item.inventory !== undefined &&
				item.inventory.tierTypeHash === TierTypeHash.exotic &&
				item.inventory.bucketTypeHash !== BucketTypeHash.engram &&
				item.inventory.bucketTypeHash !== BucketTypeHash.quest;
		};

		const items = Object.values(sales).flatMap(sale => {
			const item = inventoryItemsEntries.find(entry => entry[0] === sale.itemHash.toString());
			if (!item || !isExotic(item[1])) {
				return [];
			}

			return item[1];
		});

		return items;
	}

	private async getXurLocation(locationIndex: number) {
		const manifests = await this.destinyClient.destiny2.getDestinyManifest();
		const vendorDefinitionUrl = manifests
			.data
			.Response
			.jsonWorldComponentContentPaths
			.en
			.DestinyVendorDefinition;

		const vendorDefinition = await this.destinyClient
			.destiny2
			.readContentPath<DestinyVendorDefinitionResponse>(vendorDefinitionUrl);

		const xurEntry = Object.entries(vendorDefinition.data).find(x => x[0] === VendorHashes.xur);
		const xurDefinition = xurEntry ? xurEntry[1] : undefined;
		if (!xurDefinition) {
			throw Error('Couldnt find the vendorDefinition for Xur');
		}

		const destinationUrl = manifests
			.data
			.Response
			.jsonWorldComponentContentPaths
			.en
			.DestinyDestinationDefinition;

		const destinationDefinitions = await this.destinyClient
			.destiny2
			.readContentPath<DestinyLocationResponse>(destinationUrl);

		const destination = xurDefinition.locations[locationIndex];

		const destinationEntry = Object.entries(destinationDefinitions.data)
			.find(x => x[0] === destination.destinationHash.toString());

		if (!destinationEntry) {
			throw Error('Couldnt find destination in definitions manifest');
		}

		return destinationEntry[1].displayProperties;
	}

	public async getAdaSales() {
		const firstCharacter = await this.getFirstCharacter();

		const adaSales = await this.destinyClient.destiny2.getVendor<VendorSales>({
			characterId: firstCharacter.characterId,
			destinyMembershipId: firstCharacter.membershipId,
			membershipType: firstCharacter.membershipType,
			vendorHash: VendorHashes.ada,
			components: [Components.vendorSales]
		});

		return adaSales.data.Response.sales.data;
	}

	public async getModsFromSales(sales: { [key: string]: Sale }) {
		const saleValues = Object.values(sales);

		const manifests = await this.destinyClient.destiny2.getDestinyManifest();
		const manifestUrl = manifests
			.data
			.Response
			.jsonWorldComponentContentPaths
			.en.DestinyInventoryItemLiteDefinition;

		const inventoryItems = await this.destinyClient.destiny2.readContentPath<InventoryItems>(manifestUrl);
		const itemEntries = Object.entries(inventoryItems.data);
		const mods = saleValues.flatMap(adaSale => {
			const mod = itemEntries.find(entry => entry[0] === adaSale.itemHash.toString());
			if (mod && mod[1].itemType === ItemType.mod) {
				return mod[1];
			}

			return [];
		});

		if (!mods.length) {
			throw Error('Couldnt find mods');
		}

		return mods;
	}
}
