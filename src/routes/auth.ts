import {Router} from 'express';
import { login, me, signup } from '../controllers/auth';
import authMiddleware from '../middlewares/auth';

const authRoutes = Router();

authRoutes.post('/signup', signup);
authRoutes.post('/login', login);
authRoutes.post('/me', [authMiddleware], me)

export default authRoutes;