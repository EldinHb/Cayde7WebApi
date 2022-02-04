import { Router } from 'express';
import { setupManifest } from '../controllers/manifestController';

const ManifestRouter = Router();

ManifestRouter.get('/setup', setupManifest);

export { ManifestRouter };
