import {NextFunction, Request, Response} from 'express';
import { hashSync, compareSync } from 'bcrypt';
import { prismaClient } from '../server';
import { userLoginValidation, userSignValidation } from '../models/validations';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../credentials';
import { BadRequests } from '../exceptions/bad-requests';
import { ErrorCode } from '../exceptions/root';


export const signup = async (req:Request, res:Response, next: NextFunction) => {
    const {fullName, cpf, email, password} = req.body;

    // Validação via regex do email e do cpf
    const valid = userSignValidation(email, cpf);
    
    if(valid){
        // Validação de email já registrado
        let user = await prismaClient.user.findFirst({where: {email}})
        if(user) {
            next(new BadRequests("User Already Exists!", ErrorCode.USER_ALREADY_EXISTS))
        }
        
        //Criação de um salt para casos de senha repetida não constarem o mesmo hash no banco
        const salt = fullName.substring(0,5);

        //Atribuição da role de cliente automática, pode haver mudança para criação de administrador no futuro
        const role = await prismaClient.role.findFirst({where: {name: "client"}})
        if(role == null){
            next(new BadRequests("Role Not Found!", ErrorCode.USER_NOT_FOUND));
            return;
        }
    
        user = await prismaClient.user.create({
            data: {
                fullName,
                cpf,
                email,
                password: hashSync((password+salt),10),
                salt: salt,
                idRole: role.id
            }
        })
        res.json(user);
    } 
}

export const login = async (req:Request, res:Response, next: NextFunction) => {
    const {email, password} = req.body;

    // Validação via regex do email
    const valid = userLoginValidation(email);
    if(valid){
        // Validação de usuário existente
        let user = await prismaClient.user.findFirst({where: {email}})
        if(!user) {
            next(new BadRequests("User Not Found!", ErrorCode.USER_NOT_FOUND))
            return;
        }else if(!compareSync((password+user.salt), user.password)){
            next(new BadRequests("Invalid Credentials!", ErrorCode.INCORRECT_PASSWORD))
            return;
        }


        //Pode e até deve ser implementado um USER DTO só com name, id e email (talvez cpf).        
        const token = jwt.sign({
            userId: user.id
        }, JWT_SECRET)
        
        res.status(200).json({user, token});
    } 
    res.statusMessage = "Email incorrect or inexistent";
    res.status(400).send()
}