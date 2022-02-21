import { Client, EmbedFieldData, MessageEmbed } from 'discord.js';
import { DestinyLocation } from '../../destiny/models/destinyLocation';
import { InventoryItem } from '../../destiny/models/inventoryItem';
import { sendDiscordMessage } from '../discordHelpers';

export const sendXurLocationAndSalesToDiscord = (client: Client, location: DestinyLocation, sales: InventoryItem[]) => {
	const dropZone = getDropZone(location.displayProperties.name);
	const fields: EmbedFieldData[] = sales.map(sale => ({
		name: sale.displayProperties.name,
		value: sale.displayProperties.description ? sale.displayProperties.description : 'No description available'
	}));

	const message = new MessageEmbed()
		.setColor('DARK_GOLD')
		.setTitle('Where is Xur?')
		.setFields([
			{
				name: location.displayProperties.name,
				value: dropZone ?? '',
				inline: true
			},
			...fields
		]);

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
