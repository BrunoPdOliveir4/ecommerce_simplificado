export class SellReturnDTO {
    private _id: string;
    private _products: { quantity: number, product: { name: string } }[] = [];

    constructor(id: string) {
        this._id = id;
    }

    public get id(): string {
        return this._id;
    }


    public get products(): { name: string, quantity: number }[] {
        return this._products.map(p => ({ name: p.product.name, quantity: p.quantity }));
    }


    public addProduct(products: { quantity: number, product: { name: string } }[]): void {
        products.forEach(product => {
            this._products.push({
                quantity: product.quantity,
                product: { name: product.product.name }
            });
        });
    }


    public set setPproducts(products: { quantity: number, product: { name: string } }[]) {
        this._products = products.map(product => ({
            quantity: product.quantity,
            product: { name: product.product.name }
        }));
    }
}
