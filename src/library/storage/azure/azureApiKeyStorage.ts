import { ApiCredentials, ApiKeyStorage } from '../apiKeyStorage';
import { AzureTableClient } from './azureTableClient';

export class AzureApiKeyStorage extends AzureTableClient implements ApiKeyStorage {
	private readonly apiKeyRowKey = 'apikey';

	public async getApiKeyAsync(apiKey: string): Promise<ApiCredentials | undefined> {
		try {
			const entity = await this.client.getEntity<ApiCredentials>(apiKey, this.apiKeyRowKey);
			return {
				apikey: entity.apikey,
				owner: entity.owner
			};
		} catch (err) {
			console.log(err);
			return undefined;
		}
	}
}
