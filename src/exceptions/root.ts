export class HttpException extends Error {
    message: string;
    errorCode: any;
    statusCode: number;
    error: ErrorCode;

    constructor(message:string, errorCode:ErrorCode, statusCode:number, error:any){
        super(message)
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.error = error;
    }
}

export enum ErrorCode {
    USER_NOT_FOUND = 416,
    USER_ALREADY_EXISTS = 417,
    INCORRECT_PASSWORD = 418,
    UNAUTHORIZED = 419,
    PRODUCT_ALREADY_EXISTS = 420,
    INVALID_PRICE = 421,
    PRODUCT_NOT_FOUND = 422
}