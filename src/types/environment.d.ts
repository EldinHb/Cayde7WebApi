declare namespace NodeJS {
	export interface ProcessEnv {
		DESTINYCLIENTSECRET: string | undefined;
		DESTINYCLIENTID: string | undefined;
		STORAGEACCOUNT: string | undefined;
		CREDENTIALSTORAGENAME: string | undefined;
		DESTINYAPIKEY: string | undefined;
		CAYDE7APIKEY: string | undefined;
		DISCORDAPIKEY: string | undefined;
	}
}
