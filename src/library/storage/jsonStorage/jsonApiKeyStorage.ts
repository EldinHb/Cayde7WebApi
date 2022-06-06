import fs from 'fs';
import path from 'path';
import { DestinyOAuth } from '../../destiny/models/destinyOAuth';
import { ApiCredentials, ApiKeyStorage } from '../apiKeyStorage';
import { CredentialsStorage } from '../credentialsStorage';

export class JsonApiKeyStorage implements ApiKeyStorage {
	public async getApiKeyAsync(apiKey: string): Promise<ApiCredentials | undefined> {
		return {
			apikey: 'placeholder',
			owner: 'ik'
		};
	}
}

export class JsonCredentialsStorage implements CredentialsStorage {
	private readonly jsonFile: string;

	constructor() {
		this.jsonFile = path.join(__dirname, 'data.json');
	}

	public async getCredentialsAsync(): Promise<DestinyOAuth> {
		const fileData = await fs.promises.readFile(this.jsonFile);
		const user: DestinyOAuth = JSON.parse(fileData.toString());

		return user;
	}

	public async saveCredentialsAsync(user: DestinyOAuth): Promise<void> {
		const data = JSON.stringify(user);
		await fs.promises.writeFile(this.jsonFile, data);
	}
}
