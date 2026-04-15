import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class BusketListItem extends Component<HTMLLIElement>{
    protected indexElement: HTMLSpanElement;
    protected titleElement: HTMLSpanElement;
    protected priceElement: HTMLSpanElement;
    protected buttonElement: HTMLButtonElement;
    protected element: HTMLLIElement;
    protected counter: string;

    constructor(rootcontainer: HTMLLIElement, protected events: IEvents, item: IProduct, index: number) {
        super(rootcontainer);
        this.element = rootcontainer;
        this.counter = index.toString();
        this.indexElement = ensureElement<HTMLSpanElement>('.basket__item-index', this.element);
        this.titleElement = ensureElement<HTMLSpanElement>('.card__title', this.element);
        this.priceElement = ensureElement<HTMLSpanElement>('.card__price', this.element);
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