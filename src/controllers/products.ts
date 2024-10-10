import {NextFunction, Request, Response} from 'express';
import { prismaClient } from '../server';
import { BadRequests } from '../exceptions/bad-requests';
import { ErrorCode } from '../exceptions/root';
import { Product_DTO } from '../dto/productsDTO';


export const createProduct = async (req:Request, res:Response, next: NextFunction) => {
    
    const {name, description, price, quantity} = req.body;
    if(price <= 0 || quantity <= 0){
        return next(new BadRequests("Price and quantity must be greater than 0!", ErrorCode.PRODUCT_ALREADY_EXISTS));
    }
    // Validação de email já registrado
    let product = await prismaClient.product.findFirst({where: {name}})
    if(product) {
        return next(new BadRequests("Product Already Exists!", ErrorCode.PRODUCT_ALREADY_EXISTS));
        
    }

    product = await prismaClient.product.create({
        data: {
            name,
            description,
            price,
            quantity
        }
    })
    res.json(product);
} 

//Só retorna todos produtos.
export const getProducts = async (req:Request, res:Response, next: NextFunction) => {
    let products = await prismaClient.product.findMany({})
    res.status(200).json(products);
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params; // Obtém o ID do produto a partir dos parâmetros da requisição
    const { name, description, price, quantity } = req.body;

    try {
        // Verifica se o produto existe
        const existingProduct = await prismaClient.product.findUnique({ where: { id } });
        if (!existingProduct) {
            return next(new BadRequests("Product not found!", ErrorCode.PRODUCT_NOT_FOUND));
        }

        // Validação do preço
        if (price <= 0 || quantity <= 0) {
            return next(new BadRequests("Price must be greater than 0!", ErrorCode.INVALID_PRICE));
        }

        // Atualiza o produto no banco de dados
        const updatedProduct = await prismaClient.product.update({
            where: { id },
            data: {
                name,
                description,
                price,
                quantity,
            },
        });

        res.status(200).json(updatedProduct);
    } catch (error) {
        next(error); // Passa o erro para o middleware de tratamento de erros
    }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params; // Obtém o ID do produto a partir dos parâmetros da requisição

    try {
        // Verifica se o produto existe
        const existingProduct = await prismaClient.product.findUnique({ where: { id } });
        if (!existingProduct) {
            return next(new BadRequests("Product not found!", ErrorCode.PRODUCT_NOT_FOUND));
        }

        // Exclui o produto do banco de dados
        await prismaClient.product.delete({
            where: { id },
        });

        res.status(200).json({ message: 'Product deleted successfully.' });
    } catch (error) {
        next(error); // Passa o erro para o middleware de tratamento de erros
    }
};

export const buyProduct = async(products:Product_DTO[], sell_id:string , next: NextFunction) => {
    try {
        const dbProducts = await prismaClient.product.findMany({where: {quantity: {gt: 0}}});

        // Usar hashmap para facilitar o acesso aos produtos.
        const dbProductMap: Map<string, number> = new Map();

        dbProducts.forEach(product => {
            dbProductMap.set(product.id, product.quantity); 
        });

        // Verifica se a quantidade no banco de dados é suficiente
        products.forEach(product => {
            const availableQuantity = dbProductMap.get(product.id);

            if (availableQuantity === undefined) {
                // Produto não encontrado no banco de dados
                next(new Error(`Produto com ID ${product.id} não encontrado!`));
                return;
            }

            if (availableQuantity < product.quantity) {
                // Se a quantidade no estoque for menor que a quantidade solicitada
                next(new Error(`Estoque insuficiente para o produto ${product.id}. Disponível: ${availableQuantity}, Solicitado: ${product.quantity}`));
                return false;
            }
        });

        // Se tudo estiver ok, prossiga com o processamento da compra (atualizar estoque, etc.)
        for (const product of products) {
            await prismaClient.product.update({
                where: { id: product.id },
                data: {
                    quantity: {
                        decrement: product.quantity, 
                    },
                },
            });

            await prismaClient.productSell.create({
                data:
                {
                    idSell: sell_id,
                    idProduct: product.id,
                    quantity: product.quantity
                }
            })
        }

        return true;
    } catch (error) {
        return false; 
    }
}