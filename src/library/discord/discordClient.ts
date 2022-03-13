import { Client, ColorResolvable, EmbedField, MessageEmbed } from 'discord.js';

export class DiscordClient {
	constructor(private readonly client: Client) { }

	public sendMessage(title: string, fields: EmbedField[], color: ColorResolvable) {
		const message = new MessageEmbed()
			.setColor(color)
			.addFields(fields)
			.setTitle(title)
			.setTimestamp(new Date());

		this.client.guilds.cache.forEach(guild => {
			guild.channels.cache.forEach(channel => {
				if (channel.type === 'GUILD_TEXT' && channel.name.toLowerCase() === 'cayde7') {
					channel.send({ embeds: [message] });
				}
			});
		});
	}
}
