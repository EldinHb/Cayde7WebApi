import { Router } from 'express';
import { sendAdaSale, xurRequest } from '../controllers/vendorController';

const VendorRoutes = Router();

VendorRoutes.get('/adasale', sendAdaSale);
VendorRoutes.get('/xur', xurRequest);

export { VendorRoutes };
