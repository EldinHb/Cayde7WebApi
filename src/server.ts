import cookieParser from 'cookie-parser';
import { Client } from 'discord.js';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import statusCodes from 'http-status-codes';
import { apiRoutes } from './api/apiRoutes';
import { DiscordMiddleware } from './middleware/discordMiddleware';
import { Logger as customLogger } from './middleware/logger';

export const setupServer = (discordClient: Client) => {
	const { BAD_REQUEST } = statusCodes;

	const app = express();

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

	app.use('/api', apiRoutes);

	app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
		return res.status(statusCodes.BAD_REQUEST).json(err);
	});

	const port = Number(process.env.PORT || 3000);
	app.listen(port, '127.0.0.1', () => {
		console.log(`Express server listening on ${port}`);
	});
	// if (process.env.NODE_ENV === 'development') {
	// 	const key = fs.readFileSync('./sslcert/key.pem');
	// 	const cert = fs.readFileSync('./sslcert/cert.pem');

	// 	const server = https.createServer({ key, cert }, app);
	// 	server.listen(port, () => {
	// 		console.log(`Express server listening on ${port} with self signed https`);
	// 	});
	// } else {
	// 	app.listen(port, () => {
	// 		console.log(`Express server listening on ${port}`);
	// 	});
	// }
};

