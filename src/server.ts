import express, {Express, Request, Response} from 'express';
import { PORT } from './credentials';
import rootRouter from './routes';
import { PrismaClient } from '@prisma/client';
const app: Express = express();
//
app.use(express.json())
app.use('/api', rootRouter);


app.get('/', (req:Request, res:Response) => {
    res.send("Working...")
});

export const prismaClient = new PrismaClient({log:['query']})


app.listen(PORT, () => {
    console.log("Server running on port: "+PORT);
});