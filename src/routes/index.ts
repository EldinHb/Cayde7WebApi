import { Router } from 'express';
import exampleRouter from './exampleRoutes';

const baseRouter = Router();
baseRouter.use('/example', exampleRouter);

export default baseRouter;
