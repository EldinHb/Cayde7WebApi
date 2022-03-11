import { Router } from 'express';
import { ApiKeyMiddleware } from '../../middleware/apiKeyMiddleware';
import { DestinyApiMiddleware } from '../../middleware/destinyApiMiddleware';
import { StorageMiddleware } from '../../middleware/storageMiddleware';

const destinyRouter = Router();

destinyRouter.use('/', ApiKeyMiddleware);
destinyRouter.use('/', StorageMiddleware);
destinyRouter.use('/', DestinyApiMiddleware);
destinyRouter.get('/test', (req, res, next) => {
	console.log('hello world');
	return next();
});

export { destinyRouter };
