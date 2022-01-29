import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export async function getAllData(req: Request, res: Response) {
	return res.status(StatusCodes.OK).send('ddddd');
}

export async function testFunc(req: Request, res: Response) {
	return res.status(StatusCodes.OK).json({
		name: 'example app',
		id: 0
	});
}

export const evenKijken = async (req: Request, res: Response) => res.status(StatusCodes.OK).json({
	evenkijken: 'hoi'
});
