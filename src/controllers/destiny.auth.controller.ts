import { NextFunction, Request, Response } from 'express';

export class DestinyAuthController {
	public async authenticate(req: Request, res: Response, next: NextFunction) {
		console.log('hello world');
		next();
	}
}
