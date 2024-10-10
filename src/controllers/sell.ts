import {NextFunction, Request, Response} from 'express';
import { prismaClient } from '../server';
import { BadRequests } from '../exceptions/bad-requests';
import { ErrorCode } from '../exceptions/root';
import { buyProduct } from './products';
import { Product_DTO } from '../dto/productsDTO';
import { SellReturnDTO } from '../dto/sellReturnDTO';


export const makeASell = async (req:Request, res:Response, next: NextFunction) => {
    const {userId, totalSpent, products} = req.body;
    if(totalSpent <= 0){
        next(new BadRequests("Price must be greater than 0!", ErrorCode.PRODUCT_ALREADY_EXISTS));
        return;
    }
    let user = await prismaClient.user.findFirst({where: {id: userId}})
    if(!user) {
        next(new BadRequests("User dont Found!", ErrorCode.USER_NOT_FOUND));
        return;
    }

    //Vai registrar de toda forma, porém, se concluir vai mudar o wasCompleted para true.
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

    const allSells:SellReturnDTO[] = await formatSells(sells);

    res.status(200).json(allSells);
}

//Retorna todas compras feitas(ADMIN)
export const getSells = async (req:Request, res:Response, next: NextFunction) => {
    let sells = await prismaClient.sell.findMany({ })

    const allSells:SellReturnDTO[] = await formatSells(sells);

    res.status(200).json(allSells);
}

//Como eu fiz com tabelas intermediárias, eu tive que fazer um join, e ai para formatar foi esta aventura aqui haha
/**
 * Está função deve receber as vendas para que retorne na rota o nome do produto e a quantidade.
 * @param sells Vendas que vão ser procuradas para formatar.
 * @returns 
 */
const formatSells = async (sells: any[]): Promise<SellReturnDTO[]> => {
    const allSells: SellReturnDTO[] = await Promise.all(
        sells.map(async sell => {
            const sellReturn = new SellReturnDTO(sell.id);
            const products = await prismaClient.productSell.findMany({
                where: { idSell: sell.id },
                select: {
                    quantity: true,
                    product: {
                        select: {
                            name: true,
                        }
                    }
                }
            });
            sellReturn.addProduct(products.map(product => ({
                quantity: product.quantity,
                product: { name: product.product.name }
            })));
            return sellReturn; 
        })
    );

    return allSells;
};