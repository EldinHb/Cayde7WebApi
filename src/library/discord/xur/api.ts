import { Client, MessageEmbed } from 'discord.js';
import { DestinyLocation } from '../../destiny/models/destinyLocation';
import { sendDiscordMessage } from '../discordHelpers';

export const sendXurLocationToDiscord = (client: Client, location: DestinyLocation) => {
	const dropZone = getDropZone(location.displayProperties.name);

	const message = new MessageEmbed()
		.setColor('DARK_GOLD')
		.setTitle('Where is Xur?')
		.setFields([{
			name: location.displayProperties.name,
			value: dropZone ?? '',
			inline: true
		}]);

	sendDiscordMessage(client, message);
};

const getDropZone = (name: string) => {
	switch (name.toLowerCase()) {
		case 'european dead zone':
			return 'Winding Cove';
		case 'arcadian valley':
			return 'Watcher\'s Grave';
		default:
			return 'The Hangar';
	}
};
