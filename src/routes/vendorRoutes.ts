import { Router } from 'express';
import { Destiny2Controller } from '../controllers/destiny2.controller';

const VendorRoutes = Router();

VendorRoutes.get('/adasale', Destiny2Controller.adaSales);
// VendorRoutes.get('/xur', xurRequest);

export { VendorRoutes };

