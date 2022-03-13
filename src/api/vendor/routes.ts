import { Router } from 'express';
import { ApiKeyMiddleware } from '../../middleware/apiKeyMiddleware';
import { DestinyApiMiddleware } from '../../middleware/destinyApiMiddleware';
import { StorageMiddleware } from '../../middleware/storageMiddleware';
import { VendorController } from './controller';

const vendorRoutes = Router();

vendorRoutes.use(ApiKeyMiddleware);
vendorRoutes.use(StorageMiddleware);
vendorRoutes.use(DestinyApiMiddleware);

vendorRoutes.get('/adasale', VendorController.adaSale);
vendorRoutes.get('/xur', VendorController.xur);

export { vendorRoutes };
