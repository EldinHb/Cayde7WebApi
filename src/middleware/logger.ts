import { NextFunction, Request, Response } from 'express';
import onFinished from 'on-finished';
import { ConsoleColors } from '../util/consoleColors';

export const Logger = (req: Request, res: Response, next: NextFunction) => {
	onFinished(res, (err, newRes) => {
		if (err) {
			console.log(ConsoleColors.fgRed, err);
			return;
		}

		const color = getConsoleColor(res);

		console.log(color,
			`${new Date().toLocaleString()} - ` +
			`${newRes.req.originalUrl} - ` +
			`${newRes.req.method} / ${newRes.statusCode} - ` +
			`${newRes.statusMessage}`);
	});
	next();
};

const getConsoleColor = (res: Response) => {
	const statuscode = res.statusCode.toString();
	switch (statuscode[0]) {
		case '1':
			return ConsoleColors.fgBlue;
		case '2':
			return ConsoleColors.fgGreen;
		case '3':
			return ConsoleColors.fgYellow;
		case '4':
			return ConsoleColors.fgRed;
		case '5':
			return ConsoleColors.fgRed;
		default:
			return ConsoleColors.fgMagenta;
	}
};
