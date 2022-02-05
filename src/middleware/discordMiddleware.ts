import { Client } from 'discord.js';
import { NextFunction, Request, Response } from 'express';

export const DiscordMiddleware = async (req: Request, res: Response, next: NextFunction, discordClient: Client) => {
	req.discordClient = discordClient;
	next();
};
