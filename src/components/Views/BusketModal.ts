import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

export class BusketModal extends Component<HTMLDivElement>{
    protected listElement: HTMLUListElement;
    protected buttonElement: HTMLButtonElement;
    protected priceElement: HTMLSpanElement;
    protected element: HTMLDivElement;
    protected price: string;

    constructor(rootcontainer: HTMLDivElement, /*protected events: IEvents,*/ allPrice: number) {       
        super(rootcontainer);
        this.element = rootcontainer;
        this.price = allPrice.toString();
        this.listElement = ensureElement<HTMLUListElement>('.basket__list', this.element);
        this.buttonElement = ensureElement<HTMLButtonElement>('.basket__button', this.element);
        this.priceElement = ensureElement<HTMLSpanElement>('.basket__price', this.element);
        this.buttonElement.addEventListener('click', () => {
            console.log("click on button");
            // this.events.emit('card:select');
        });

        this.render();
    }

    render() {
        this.priceElement.textContent = this.price + " синапсов";
        return this.element;
    }

    set content(element: HTMLLIElement) {
        this.listElement.appendChild(element);
   }
}