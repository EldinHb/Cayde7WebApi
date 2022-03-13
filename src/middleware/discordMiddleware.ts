import { Client } from 'discord.js';
import { NextFunction, Request, Response } from 'express';
import { DiscordClient } from '../library/discord/discordClient';

export const DiscordMiddleware = async (req: Request, res: Response, next: NextFunction, discordClient: Client) => {
	req.discordClient = new DiscordClient(discordClient);
	return next();
};
