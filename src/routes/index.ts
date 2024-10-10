import { Router } from "express";
import authRoutes from "./auth";
import productRoutes from "./products";
import sellsRoutes from "./sell";

const rootRouter:Router = Router();

rootRouter.use('/auth', authRoutes);
rootRouter.use('/products', productRoutes);
rootRouter.use('/sell', sellsRoutes);

export default rootRouter;

