// eslint-disable-next-line unused-imports/no-unused-imports
import { IDestinyClient } from '../../library/destiny/destinyClient';
import { IDestinyRepository } from '../../library/destiny/destinyRepository';
import { DestinyOAuth } from '../../library/destiny/models/destinyOAuth';
import { DiscordClient } from '../../library/discord/discordClient';
import { CredentialsStorage } from '../../library/storage/credentialsStorage';

declare global {
	namespace Express {
		interface Request {
			credentialsStorage: CredentialsStorage | undefined;
			destinyUser: DestinyOAuth | undefined;
			destiny2Client: IDestinyClient | undefined;
			discordClient: DiscordClient | undefined;
			destinyRepository: IDestinyRepository | undefined;
		}
	}
}
