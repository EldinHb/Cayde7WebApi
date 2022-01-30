declare namespace NodeJS {
	export interface ProcessEnv {
		DESTINYCLIENTSECRET: string | undefined;
		DESTINYCLIENTID: string | undefined;
		STORAGEACCOUNT: string | undefined;
		CREDENTIALSTORAGENAME: string | undefined;
	}
}
