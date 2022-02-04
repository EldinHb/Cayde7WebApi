import { TableClient } from '@azure/data-tables';

const apiKeyRowKey = 'apikey';

export const getApiKey = async (client: TableClient, apiKey: string) => {
	try {
		const entity = await client.getEntity(apiKey, apiKeyRowKey);
		return entity;
	} catch (err) {
		console.log(err);
		return undefined;
	}
};
