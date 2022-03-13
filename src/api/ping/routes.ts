import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const pingRouter = Router();

pingRouter.get('/', (req, res) => res.status(StatusCodes.OK).json('pong'));

export { pingRouter };
