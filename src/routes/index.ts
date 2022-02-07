import { Router } from 'express';
import { ApiKeyMiddleware } from '../middleware/apiKeyMiddleware';
import { DestinyApiMiddleware } from '../middleware/destinyApiMiddleware';
import { StorageMiddleware } from '../middleware/storageMiddleware';
import { DestinyAuthRouter } from './destinyAuthRoutes';
import { PingRouter } from './pingRoutes';
import { VendorRoutes } from './vendorRoutes';

const baseRouter = Router();

baseRouter.use('/ping', PingRouter);

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

export default baseRouter;
