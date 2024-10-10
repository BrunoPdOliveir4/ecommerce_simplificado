import {NextFunction, Request, Response} from 'express';
import { prismaClient } from '../server';
import { BadRequests } from '../exceptions/bad-requests';
import { ErrorCode } from '../exceptions/root';
import { buyProduct } from './products';
import { Product_DTO } from '../dto/productsDTO';


export const makeASell = async (req:Request, res:Response, next: NextFunction) => {
    const {userId, totalSpent, products} = req.body;
    if(totalSpent <= 0){
        return next(new BadRequests("Price must be greater than 0!", ErrorCode.PRODUCT_ALREADY_EXISTS));
    }
    let user = await prismaClient.user.findFirst({where: {id: userId}})
    if(!user) {
        return next(new BadRequests("User dont Found!", ErrorCode.USER_NOT_FOUND));
        
    }

    //it will register anyways if you're trying to buy, but it only become true if sell is completed.
    let sell = await prismaClient.sell.create({
        data: {
            idUser: userId,
            totalSpent: totalSpent,
            wasCompleted: false,
        }
    })
    let productsDTO:Product_DTO[] = [];
    products.forEach((product: { id: string; quantity: number; }) => {
        productsDTO.push(new Product_DTO(product.id, product.quantity))
    });

    const buyCompleted = await buyProduct(productsDTO, sell.id, next);
    if(buyCompleted){
        sell = await prismaClient.sell.update({
            where: {id: sell.id},
            data: {
                wasCompleted: true
            }
        })
    }
    res.status(200).send(sell)
} 

//Só retorna todas compras do cliente.
export const getMySells = async (req:Request, res:Response, next: NextFunction) => {
    const {userId} = req.body;
    let sells = await prismaClient.sell.findMany({where: {idUser: userId}})
    
    res.status(200).json(sells);
}

//Retorna todas compras feitas(ADMIN)
export const getSells = async (req:Request, res:Response, next: NextFunction) => {
    let sells = await prismaClient.sell.findMany({ })
    
    res.status(200).json(sells);
}