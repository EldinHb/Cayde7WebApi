import { Router } from 'express';
import { evenKijken, getAllData, testFunc } from '../controllers/exampleController';

const exampleRouter = Router();

exampleRouter.get('/all', getAllData);
exampleRouter.get('/', testFunc);
exampleRouter.get('/evenkijken', evenKijken);
export default exampleRouter;
