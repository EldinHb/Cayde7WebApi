import { TableClient } from '@azure/data-tables';
import { DefaultAzureCredential } from '@azure/identity';


export const createCredentialsTable = (storageAccount: string, tableName: string) => {
	const client = new TableClient(
		`https://${storageAccount}.table.core.windows.net`,
		tableName,
		new DefaultAzureCredential()
	);

	client.createTable();

	return client;
};
