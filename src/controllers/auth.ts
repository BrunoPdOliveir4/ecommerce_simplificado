import {Request, Response} from 'express';
import { hashSync, compareSync } from 'bcrypt';
import { prismaClient } from '../server';
import { userLoginValidation, userSignValidation } from '../models/validations';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../credentials';


export const signup = async (req:Request, res:Response) => {
    const {fullName, cpf, email, password} = req.body;

    // Validação via regex do email e do cpf
    const valid = userSignValidation(email, cpf);
    
    if(valid){
        // Validação de email já registrado
        let user = await prismaClient.user.findFirst({where: {email}})
        if(user) {
            throw Error ('User already exists!')
        }
        
        //Criação de um salt para casos de senha repetida não constarem o mesmo hash no banco
        const salt = fullName.substring(0,5);

        //Atribuição da role de cliente automática, pode haver mudança para criação de administrador no futuro
        const role = await prismaClient.role.findFirst({where: {name: "client"}})
        if(role == null) throw Error("Role not exists");
    
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

export const login = async (req:Request, res:Response) => {
    const {email, password} = req.body;

    // Validação via regex do email
    const valid = userLoginValidation(email);
    if(valid){
        // Validação de usuário existente
        let user = await prismaClient.user.findFirst({where: {email}})
        if(!user) {
            throw Error ('User do not exists!')
        }
        if(!compareSync((password+user.salt), user.password)){
            throw Error('Incorrect password sent!');
        }
        const token = jwt.sign({
            userId: user.id
        }, JWT_SECRET)
        

        res.json({user, token});
    } 
    res.statusMessage = "Email incorrect or inexistent";
    res.status(400).send()
}