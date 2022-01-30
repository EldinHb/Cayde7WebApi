// eslint-disable-next-line unused-imports/no-unused-imports
import { DestinyApi } from '../../library/destiny/destinyApi';
import { CredentialsStorage } from '../../library/storage/credentialsStorage';

declare global {
	namespace Express {
		interface Request {
			credentialsStorage?: CredentialsStorage;
			destinyApi?: DestinyApi;
		}
	}
}
