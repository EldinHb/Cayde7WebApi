import { Router } from 'express';
import { sendAdaSale } from '../controllers/vendorController';

const VendorRoutes = Router();

VendorRoutes.get('/adasale', sendAdaSale);

export { VendorRoutes };
