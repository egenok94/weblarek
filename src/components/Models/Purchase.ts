import { IProduct } from "../../types";

export class Purchase{
    products: IProduct[];

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
        let index = this.products.indexOf(product);

        if(index !== -1) {
            this.products.splice(index, 1);
        }
    }

    clearPurchase(): void {
        this.products = [];
    }

    getCost(): number {
        let result = 0;
        this.products.forEach(item => {
            if(item.price !== null){
                result += item.price;
            }
        })
        return result; 
    }

    getCount(): number {
        return this.products.length;
    }

    checkProduct(id: string): boolean {
        if (this.products.find(item => item.id === id)){
            return true;
        } else {
            return false;
        }
    }
}