import { TableClient } from '@azure/data-tables';
import { DefaultAzureCredential } from '@azure/identity';

export abstract class AzureTableClient {
	protected readonly client: TableClient;

	constructor(private readonly storageAccount: string, private readonly tableName: string) {
		this.client = new TableClient(
			`https://${this.storageAccount}.table.core.windows.net`,
			this.tableName,
			new DefaultAzureCredential()
		);

		this.client.createTable();
	}
}
