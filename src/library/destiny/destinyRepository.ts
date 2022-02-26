import { CharactersFactory } from './characterFactory';
import { DestinyClient } from './destinyClient';

export class DestinyRepository {

	private characterFactory: CharactersFactory;

	constructor(public readonly client: DestinyClient) {
		this.characterFactory = new CharactersFactory(client);
	}

	public async getAdaSales() {
		const characters = await this.characterFactory.getCharacters();
		console.log(characters);
	}
}
