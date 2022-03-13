import { Router } from 'express';
import { destinyRouter } from './destiny2';
import { pingRouter } from './ping';
import { vendorRoutes } from './vendor';

const apiRoutes = Router();

apiRoutes.use('/destiny2', destinyRouter);
apiRoutes.use('/vendor', vendorRoutes);
apiRoutes.use('/ping', pingRouter);

export { apiRoutes };
