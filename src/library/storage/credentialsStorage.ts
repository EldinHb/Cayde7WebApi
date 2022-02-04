import { TableClient } from '@azure/data-tables';
import { DestinyOAuth } from '../destiny/models/destinyOAuth';

export const saveCredentialsAsync = async (client: TableClient, user: DestinyOAuth) => {
	user.timestamp = new Date();
	user.partitionKey = user.membership_id;
	user.rowKey = user.token_type;
	await client.upsertEntity(user);
};

export const getCredentialsAsync = async (client: TableClient): Promise<DestinyOAuth> => {
	return (await client.listEntities().next()).value;
};
