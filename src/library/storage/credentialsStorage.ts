import { DestinyOAuth } from '../destiny/models/destinyOAuth';

export interface CredentialsStorage {
	getCredentialsAsync: () => Promise<DestinyOAuth>;
	saveCredentialsAsync: (user: DestinyOAuth) => Promise<void>;
}
