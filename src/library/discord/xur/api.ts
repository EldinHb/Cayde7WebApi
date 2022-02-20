import { Client, MessageEmbed } from 'discord.js';
import { DestinyLocation } from '../../destiny/models/destinyLocation';

export const sendXurLocationToDiscord = (client: Client, location: DestinyLocation) => {
	const dropZone = getDropZone(location.displayProperties.name);

	const message = new MessageEmbed()
		.setColor('DARK_GOLD')
		.setTitle('Xur location')
		.setFields([{
			name: location.displayProperties.name,
			value: dropZone ?? '',
			inline: true
		}]);

	client.guilds.cache.forEach(guild => {
		guild.channels.cache.forEach(channel => {
			if (channel.type === 'GUILD_TEXT' && channel.name.toLowerCase() === 'cayde7') {
				channel.send({ embeds: [message] });
			}
		});
	});
};

const getDropZone = (name: string) => {
	switch (name.toLowerCase()) {
		case 'european dead zone':
			return 'Winding Cove';
		default:
			return;
	}
};
