export interface ApiKeyStorage {
	getApiKeyAsync: (apiKey: string) => Promise<ApiCredentials | undefined>;
}

export interface ApiCredentials {
	apikey: string;
	owner: string;
}
