import { IProduct } from "../../types";


export class Products{
        private products: IProduct[];
        private selectedproduct: IProduct | null;

    constructor() {
        this.products = new Array<IProduct>();
        this.selectedproduct = null;
        }

    setItems(items: IProduct[]): void {
        this.products = [];
        items.forEach(item => this.products.push(item))
    }

    getItems(): IProduct[] {
        return this.products;
    }

    getItemById(id: string): IProduct | undefined {
        return this.products.find(item => item.id === id)
    }

    setItem(id: string): void {
        this.selectedproduct = this.getItemById(id);
    }

    getDetailCard (): IProduct | null {
        return this.selectedproduct;
    }

}