import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import { JWT_SECRET } from "../credentials";
import * as jwt from "jsonwebtoken";
import { prismaClient } from "../server";

const authMiddleware = async(req: Request,res: Response, next:NextFunction) => {
    const token = req.headers.authorization
    if(!token){
        console.log("OK")
        next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED));
        return;
    }
    try{
        const payload = jwt.verify(token, JWT_SECRET) as any;
        const user = await prismaClient.user.findFirst({where: {id: payload.userId}})
        if(!user){
            next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
            return;
        }
        req.body.userId = user.id;
        next();
        
    }
    catch(error){
        console.log(error)
        next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
    }
}

export default authMiddleware;