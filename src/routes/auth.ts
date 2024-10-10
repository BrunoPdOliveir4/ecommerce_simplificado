import {Router} from 'express';
import { amIAdmin, amIUser, login, signup } from '../controllers/auth';
import authMiddleware from '../middlewares/auth';
import adminAuthMiddleware from '../middlewares/admin_auth';

const authRoutes = Router();

authRoutes.post('/signup', signup);
authRoutes.post('/login', login);
authRoutes.get('/user', [authMiddleware], amIUser)
authRoutes.get('/admin', [adminAuthMiddleware], amIAdmin)

export default authRoutes;