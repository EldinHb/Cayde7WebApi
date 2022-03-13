import { Router } from 'express';
import { ApiKeyMiddleware } from '../../middleware/apiKeyMiddleware';
import { DestinyApiMiddleware } from '../../middleware/destinyApiMiddleware';
import { StorageMiddleware } from '../../middleware/storageMiddleware';
import { Destiny2Controller } from './controller';

const destinyRouter = Router();

destinyRouter.use(StorageMiddleware);
destinyRouter.get('/login', Destiny2Controller.login);

destinyRouter.use(ApiKeyMiddleware);
destinyRouter.use(DestinyApiMiddleware);

export { destinyRouter };
