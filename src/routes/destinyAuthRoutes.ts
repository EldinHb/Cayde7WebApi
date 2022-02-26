import { Router } from 'express';
import { DestinyAuthController } from '../controllers/destiny.auth.controller';

const DestinyAuthRouter = Router();

DestinyAuthRouter.get('/', DestinyAuthController.authenticate);

export { DestinyAuthRouter };

