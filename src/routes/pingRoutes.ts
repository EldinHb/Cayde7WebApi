import { Router } from 'express';
import { ping } from '../controllers/pingController';

const PingRouter = Router();

PingRouter.get('/', ping);

export { PingRouter };
