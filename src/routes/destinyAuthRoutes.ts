import { Router } from 'express';
import { authenticate, testDing } from '../controllers/destinyAuthController';
import { ApiKeyMiddleware } from '../middleware/apiKeyMiddleware';
import { DestinyApiMiddleware } from '../middleware/destinyApiMiddleware';
import { StorageMiddleware } from '../middleware/storageMiddleware';

const DestinyAuthRouter = Router();

DestinyAuthRouter.use(ApiKeyMiddleware);
DestinyAuthRouter.use(StorageMiddleware);
DestinyAuthRouter.use(DestinyApiMiddleware);
DestinyAuthRouter.get('/', authenticate);
DestinyAuthRouter.get('/testding', testDing);

export { DestinyAuthRouter };
