import { IProduct } from "../../types";
import { IEvents } from "../base/Events";


export class Products{
        private products: IProduct[];
        private selectedproduct: IProduct | null;

    constructor(protected events: IEvents) {
        this.products = new Array<IProduct>();
        this.selectedproduct = null;
        }

    setItems(items: IProduct[]): void {
        this.products = [];
        items.forEach(item => this.products.push(item))
        this.events.emit("catalog:change");
    }

    getItems(): IProduct[] {
        return this.products;
    }

    getItemById(id: string): IProduct | undefined {
        return this.products.find(item => item.id === id)
    }

    setItem(id: string): void {
        this.selectedproduct = this.getItemById(id) ?? null;
        this.events.emit("card:selected");
    }

    getDetailCard (): IProduct | null {
        return this.selectedproduct;
        
    }

}