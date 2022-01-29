import { Router } from 'express';
import { authenticate } from '../controllers/destinyAuthController';

const DestinyAuthRouter = Router();

DestinyAuthRouter.get('/', authenticate);

export { DestinyAuthRouter };
