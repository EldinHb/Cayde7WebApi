import { IDestinyClient } from './destinyClient';

export interface IDestinyRepository {
	getAdaSales(): Promise<void>;
}

export class DestinyRepository implements IDestinyRepository {
	public readonly destinyClient: IDestinyClient;

	constructor(client: IDestinyClient) {
		this.destinyClient = client;
	}

	public async getAdaSales() {
		console.log('get ada sales');
	}
}
