import { Router } from 'express';
import { destinyRouter } from './destiny2';

const apiRoutes = Router();

apiRoutes.use('/destiny2', destinyRouter);

export { apiRoutes };
