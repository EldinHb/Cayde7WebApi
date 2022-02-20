import { Client, MessageEmbed } from 'discord.js';

export const sendDiscordMessage = (client: Client, message: MessageEmbed) => {
	client.guilds.cache.forEach(guild => {
		guild.channels.cache.forEach(channel => {
			if (channel.type === 'GUILD_TEXT' && channel.name.toLowerCase() === 'cayde7') {
				channel.send({ embeds: [message] });
			}
		});
	});
};
