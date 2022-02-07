// eslint-disable-next-line unused-imports/no-unused-imports
import { AxiosInstance } from 'axios';
import { Client } from 'discord.js';
import { DestinyOAuth } from '../../library/destiny/models/destinyOAuth';
import { CredentialsStorage } from '../../library/storage/credentialsStorage';

declare global {
	namespace Express {
		interface Request {
			credentialsStorage: CredentialsStorage;
			destinyUser: DestinyOAuth;
			destinyClient: AxiosInstance;
			discordClient: Client;
		}
	}
}
