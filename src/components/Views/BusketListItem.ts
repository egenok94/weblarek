import { ensureElement } from "../../utils/utils";
import { IProduct } from "../../types";
import { IEvents } from "../base/Events";
import { CardALL } from "./CardAll";

export class BusketListItem extends CardALL{
    protected indexElement: HTMLSpanElement;
    protected buttonElement: HTMLButtonElement;
    protected element: HTMLLIElement;
    protected counter: string;

    constructor(rootcontainer: HTMLLIElement, protected events: IEvents, item: IProduct, index: number) {
        super(rootcontainer);
        this.element = rootcontainer;
        this.counter = index.toString();
        this.indexElement = ensureElement<HTMLSpanElement>('.basket__item-index', this.element);
        this.buttonElement = ensureElement<HTMLButtonElement>('.basket__item-delete', this.element);
        this.buttonElement.addEventListener('click', () => {
            this.events.emit('card:delete-from-busket', item);
        });
    }

    render(item: IProduct) {
        this.indexElement.textContent = this.counter;
        this.titleElement.textContent = item.title;
        this.priceElement.textContent = item.price + " синапсов";
        return this.element;
    }
}