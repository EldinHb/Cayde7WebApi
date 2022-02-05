import { Client, MessageEmbed } from 'discord.js';
import { InventoryItem } from '../../destiny/models/inventoryItem';

export const sendAdaSalesToDiscord = async (client: Client, sales: InventoryItem[]) => {
	const fields = sales.map(x => ({
		name: x.displayProperties.name,
		value: x.itemTypeDisplayName,
		inline: true
	}));
	const message = new MessageEmbed()
		.setColor('FUCHSIA')
		.setTitle('Ada mods of the day')
		.addFields(fields)
		.setTimestamp();

	client.guilds.cache.forEach(guild => {
		guild.channels.cache.forEach(channel => {
			if (channel.type === 'GUILD_TEXT' && channel.name.toLowerCase() === 'cayde7') {
				channel.send({ embeds: [message] });
			}
		});
	});
};
