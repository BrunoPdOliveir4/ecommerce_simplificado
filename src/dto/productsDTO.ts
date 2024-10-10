export class Product_DTO {
    private _id: string;         
    private _quantity: number;    

    constructor(id: string, quantity: number) {
        this._id = id;            
        this._quantity = quantity; 
    }

    public get id(): string {
        return this._id;          
    }

    public get quantity(): number {
        return this._quantity;     
    }

    public validateQuantity(): boolean {
        return this._quantity > 0; 
    }
}