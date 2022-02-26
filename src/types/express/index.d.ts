// eslint-disable-next-line unused-imports/no-unused-imports
import { AxiosInstance } from 'axios';
import { DestinyClient } from '../../library/destiny/destinyClient';
import { DestinyRepository } from '../../library/destiny/destinyRepository';
import { DestinyOAuth } from '../../library/destiny/models/destinyOAuth';
import { DiscordClient } from '../../library/discord/discordClient';
import { CredentialsStorage } from '../../library/storage/credentialsStorage';

declare global {
	namespace Express {
		interface Request {
			credentialsStorage: CredentialsStorage;
			destinyUser: DestinyOAuth;
			destinyClient: AxiosInstance;
			destiny2Client: DestinyClient | undefined;
			discordClient: DiscordClient | undefined;
			destinyRepository: DestinyRepository | undefined;
		}
	}
}
