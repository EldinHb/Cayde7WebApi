import { Client } from 'discord.js';
import 'dotenv/config';
import { setupServer } from './server';

const setupDiscord = async () => {
	const discordClient = new Client({ intents: ['GUILDS'] });
	discordClient.on('ready', async client => {
		setupServer(client);
	});
	const discordApikey = process.env.DISCORDAPIKEY;
	if (!discordApikey) {
		console.log('Couldnt start server');
		throw Error('Discord api key not set in env');
	}
	await discordClient.login(discordApikey);
};

(async () => {
	await setupDiscord();
})().catch(err => console.log(err));
