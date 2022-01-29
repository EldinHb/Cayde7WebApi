import { Request, Response } from 'express';

export const authenticate = async (req: Request, res: Response) => res.status(200)
	.json(
		'Hello world'
	);
