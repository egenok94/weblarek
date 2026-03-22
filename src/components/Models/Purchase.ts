import { IProduct } from "../../types";

export class Purchase{
    private products: IProduct[];

    constructor(){
        this.products = new Array<IProduct>();
    }

    getProducts(): IProduct[] {
        return this.products;
    }

    addProduct(product: IProduct): void {
        this.products.push(product);
    }

    deleteProduct(product: IProduct): void {
        const index = this.products.findIndex(item => item.id === product.id);

        if(index !== -1) {
            this.products.splice(index, 1);
        }
    }

    clearPurchase(): void {
        this.products = [];
    }

    getCost(): number {
        const priceSum = this.products.reduce((sum, item) => {
            if(item.price !== null){
                sum += item.price;
            }
            return sum;
        },0);

        return priceSum;
    }

    getCount(): number {
        return this.products.length;
    }

    checkProduct(id: string): boolean {
         return this.products.some((item) => {
            return item.id == id;
    });
        
    }
}