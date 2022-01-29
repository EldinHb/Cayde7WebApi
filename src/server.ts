import cookieParser from 'cookie-parser';
import express, { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import helmet from 'helmet';
import statusCodes from 'http-status-codes';
import https from 'https';
import Logger from 'jet-logger';
import { Logger as customLogger } from './middleware/logger';
import baseRouter from './routes';

const { BAD_REQUEST } = statusCodes;

const app = express();

const key = fs.readFileSync('./sslcert/key.pem');
const cert = fs.readFileSync('./sslcert/cert.pem');

const server = https.createServer({ key, cert }, app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
	app.use(customLogger);
}

if (process.env.NODE_ENV === 'production') {
	app.use(helmet());
}

app.use('/api', baseRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	Logger.Err(err, true);
	return res.status(BAD_REQUEST).json({
		error: err.message,
	});
});

export default server;
