import {Router} from 'express';
import { login, signup } from '../controllers/auth';

const authRoutes = Router();

authRoutes.post('/signuṕ', signup);
authRoutes.post('/login', login);

export default authRoutes;