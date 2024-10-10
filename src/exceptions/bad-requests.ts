import { ErrorCode, HttpException } from "./root";

export class BadRequests extends HttpException{
    constructor(message: string, errorCode:ErrorCode){
        super(message, errorCode, 400, null);
    }
}

export class IncorrectPassword extends HttpException{
    constructor(message: string, errorCode:ErrorCode){
        super(message, errorCode, 400, null);
    }
}

export class UserNotFound extends HttpException {
    constructor(message: string, errorCode: ErrorCode) {
        super(message, errorCode, 400, null);
    }
}

export class UserAlreadyExists extends HttpException {
    constructor(message: string, errorCode: ErrorCode) {
        super(message, errorCode, 400, null);
    }
}

export class Unauthorized extends HttpException {
    constructor(message: string, errorCode: ErrorCode) {
        super(message, errorCode, 400, null);
    }
}

export class ProductAlreadyExists extends HttpException {
    constructor(message: string, errorCode: ErrorCode) {
        super(message, errorCode, 400, null);
    }
}

export class InvalidPrice extends HttpException {
    constructor(message: string, errorCode: ErrorCode) {
        super(message, errorCode, 400, null);
    }
}

export class ProductNotFound extends HttpException {
    constructor(message: string, errorCode: ErrorCode) {
        super(message, errorCode, 400, null);
    }
}
