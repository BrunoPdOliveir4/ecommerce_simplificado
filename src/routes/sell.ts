import {Router} from 'express';
import { amIAdmin, amIUser, login, signup } from '../controllers/auth';
import authMiddleware from '../middlewares/auth';
import adminAuthMiddleware from '../middlewares/admin_auth';
import { getMySells, getSells, makeASell } from '../controllers/sell';

const sellsRoutes = Router();

sellsRoutes.post('/', [authMiddleware], makeASell);
sellsRoutes.get('/', [authMiddleware], getMySells);
sellsRoutes.get('/All', [adminAuthMiddleware], getSells);

export default sellsRoutes;