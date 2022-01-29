import { Router } from 'express';
import { DestinyAuthRouter } from './destinyAuthRoutes';
import exampleRouter from './exampleRoutes';

const baseRouter = Router();
baseRouter.use('/example', exampleRouter);
baseRouter.use('/destinyauth', DestinyAuthRouter);

export default baseRouter;
