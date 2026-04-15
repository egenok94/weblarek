import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

export class BusketModal extends Component<HTMLDivElement>{
    protected listElement: HTMLUListElement;
    protected buttonElement: HTMLButtonElement;
    protected priceElement: HTMLSpanElement;
    protected element: HTMLDivElement;

    constructor(rootcontainer: HTMLDivElement, protected events: IEvents,) {       
        super(rootcontainer);
        this.element = rootcontainer;
        this.listElement = ensureElement<HTMLUListElement>('.basket__list', this.element);
        this.buttonElement = ensureElement<HTMLButtonElement>('.basket__button', this.element);
        this.priceElement = ensureElement<HTMLSpanElement>('.basket__price', this.element);
        this.buttonElement.onclick = () => {
            this.events.emit('modal:firstform');
        };

        this.render();
    }

    render() {
        return this.element;
    }

    set content(element: HTMLLIElement) {
        this.listElement.appendChild(element);
   }
   setCost(allPrice: number) {
    this.priceElement.textContent = allPrice.toString() + " синапсов";
    this.buttonElement.disabled = allPrice === 0 ? true : false;
   }

   clearBusket() {
    this.listElement.replaceChildren();
   }
}