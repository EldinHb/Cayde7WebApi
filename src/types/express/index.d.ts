// eslint-disable-next-line unused-imports/no-unused-imports
import { TableClient } from '@azure/data-tables';
import { AxiosInstance } from 'axios';
import { Client } from 'discord.js';
import { DestinyOAuth } from '../../library/destiny/models/destinyOAuth';

declare global {
	namespace Express {
		interface Request {
			credentialsStorage: TableClient;
			destinyUser: DestinyOAuth;
			destinyClient: AxiosInstance;
			discordClient: Client;
		}
	}
}
