import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Purchase{
    private products: IProduct[];
    protected events: IEvents;

    constructor(events: IEvents){
        this.products = new Array<IProduct>();
        this.events = events;
    }

    getProducts(): IProduct[] {
        return this.products;
    }

    addProduct(product: IProduct): void {
        this.products.push(product);
        this.events.emit("busket:change");
    }

    deleteProduct(product: IProduct): void {
        const index = this.products.findIndex(item => item.id === product.id);

        if(index !== -1) {
            this.products.splice(index, 1);
        }

        this.events.emit("busket:change");
    }

    clearPurchase(): void {
        this.products = [];
        this.events.emit("busket:change");
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