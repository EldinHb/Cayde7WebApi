export interface AuthenticationConfig {
	clientId: string;
	clientSecret: string;
	/**
	 * Can also be refreshtoken
	 */
	code: string;
}
