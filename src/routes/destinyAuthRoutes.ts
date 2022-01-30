import { Router } from 'express';
import { authenticate, testDing } from '../controllers/destinyAuthController';

const DestinyAuthRouter = Router();

DestinyAuthRouter.get('/', authenticate);
DestinyAuthRouter.get('/testding', testDing);

export { DestinyAuthRouter };
