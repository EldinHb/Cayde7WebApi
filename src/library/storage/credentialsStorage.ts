import { TableClient } from '@azure/data-tables';
import { DefaultAzureCredential } from '@azure/identity';
import { DestinyOAuth } from '../destiny/models/destinyOAuth';

export const createCredentialsTable = (storageAccount: string, tableName: string) => {
	const client = new TableClient(
		`https://${storageAccount}.table.core.windows.net`,
		tableName,
		new DefaultAzureCredential()
	);

	client.createTable();

	return client;
};

export const saveCredentialsAsync = async (client: TableClient, user: DestinyOAuth) => {
	user.timestamp = new Date();
	user.partitionKey = user.membership_id;
	user.rowKey = user.token_type;
	await client.upsertEntity(user);
};

export const getCredentialsAsync = async (client: TableClient): Promise<DestinyOAuth> => {
	return (await client.listEntities().next()).value;
};
