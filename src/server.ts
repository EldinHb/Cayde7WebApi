import cookieParser from 'cookie-parser';
import { Client } from 'discord.js';
import express, { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import helmet from 'helmet';
import statusCodes from 'http-status-codes';
import https from 'https';
import { DiscordMiddleware } from './middleware/discordMiddleware';
import { Logger as customLogger } from './middleware/logger';
import baseRouter from './routes';

export const setupServer = (discordClient: Client) => {
	const { BAD_REQUEST } = statusCodes;

	const app = express();

	const key = fs.readFileSync('./sslcert/key.pem');
	const cert = fs.readFileSync('./sslcert/cert.pem');

	const server = https.createServer({ key, cert }, app);

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cookieParser());
	app.use((req, res, next) => DiscordMiddleware(req, res, next, discordClient));

	if (process.env.NODE_ENV === 'development') {
		app.use(customLogger);
	}

	if (process.env.NODE_ENV === 'production') {
		app.use(helmet());
	}

	app.use('/api', baseRouter);

	app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
		return res.status(BAD_REQUEST).json({
			error: err.message,
		});
	});

	const port = Number(process.env.PORT || 3000);
	if (process.env.NODE_ENV === 'development') {
		server.listen(port, () => {
			console.log(`Express server listening on ${port} with self signed https`);
		});
	} else {
		app.listen(port, () => {
			console.log(`Express server listening on ${port}`);
		});
	}
};

