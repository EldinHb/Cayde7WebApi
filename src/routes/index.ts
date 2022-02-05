import { Router } from 'express';
import { ApiKeyMiddleware } from '../middleware/apiKeyMiddleware';
import { DestinyApiMiddleware } from '../middleware/destinyApiMiddleware';
import { StorageMiddleware } from '../middleware/storageMiddleware';
import { DestinyAuthRouter } from './destinyAuthRoutes';
import exampleRouter from './exampleRoutes';
import { ManifestRouter } from './manifestRoutes';
import { VendorRoutes } from './vendorRoutes';

const baseRouter = Router();

baseRouter.use('/example', exampleRouter);

baseRouter.use('/destinyauth',
	StorageMiddleware,
	DestinyApiMiddleware,
	DestinyAuthRouter
);

baseRouter.use('/vendor',
	ApiKeyMiddleware,
	StorageMiddleware,
	DestinyApiMiddleware,
	VendorRoutes
);

baseRouter.use('/manifest', ApiKeyMiddleware,
	StorageMiddleware,
	DestinyApiMiddleware,
	ManifestRouter
);

export default baseRouter;
