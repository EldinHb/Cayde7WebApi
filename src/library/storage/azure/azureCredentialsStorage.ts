import { DestinyOAuth } from '../../destiny/models/destinyOAuth';
import { CredentialsStorage } from '../credentialsStorage';
import { AzureTableClient } from './azureTableClient';

export class AzureCredentialsStorage extends AzureTableClient implements CredentialsStorage {
	public async getCredentialsAsync(): Promise<DestinyOAuth> {
		return (await this.client.listEntities().next()).value;
	}

	public async saveCredentialsAsync(user: DestinyOAuth) {
		user.timestamp = new Date();
		user.partitionKey = user.membership_id;
		user.rowKey = user.token_type;
		await this.client.upsertEntity(user);
	}
}
