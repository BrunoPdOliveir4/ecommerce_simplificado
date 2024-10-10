import {Router} from 'express';
import authMiddleware from '../middlewares/auth';
import adminAuthMiddleware from '../middlewares/admin_auth';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/products';

const productRoutes = Router();

productRoutes.get('/', [authMiddleware], getProducts);

productRoutes.post('/', [adminAuthMiddleware], createProduct);

productRoutes.put('/:id', [adminAuthMiddleware], updateProduct);

productRoutes.delete('/:id', [adminAuthMiddleware], deleteProduct);

export default productRoutes;