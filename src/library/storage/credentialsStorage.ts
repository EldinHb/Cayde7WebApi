import { TableClient } from '@azure/data-tables';
import { DefaultAzureCredential } from '@azure/identity';
import { DestinyOAuth } from '../destiny/models/destinyOAuth';

export type CredentialsStorage = {
	getUserAsync: () => Promise<DestinyOAuth>;
	setUserAsync: (user: DestinyOAuth) => Promise<void>;
};

export const CredentialsTableStorage = (): CredentialsStorage => {
	const account = process.env.STORAGEACCOUNT;
	const tableName = process.env.CREDENTIALSTORAGENAME;

	if (!account || !tableName) {
		throw Error('Cannot find environment variables');
	}

	const credentials = new DefaultAzureCredential();

	const client = new TableClient(
		`https://${account}.table.core.windows.net`,
		tableName,
		credentials
	);

	client.createTable();

	return {
		getUserAsync: async function () {
			const user: DestinyOAuth = (await client.listEntities().next()).value;
			return user;
		},
		setUserAsync: async function (user: DestinyOAuth) {
			user.timestamp = new Date();
			await client.upsertEntity(user);
		}
	};
};
