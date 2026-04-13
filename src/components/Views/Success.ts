import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

export class Success extends Component<HTMLDivElement>{
    protected titleElement: HTMLHeadElement;
    protected descElement: HTMLParagraphElement;
    protected buttonElement: HTMLButtonElement;
    protected element: HTMLDivElement;
    protected price: string;

    constructor(rootcontainer: HTMLDivElement, /*protected events: IEvents,*/ allPrice: number) {       
        super(rootcontainer);
        this.element = rootcontainer;
        this.price = allPrice.toString();
        this.titleElement = ensureElement<HTMLHeadElement>('.order-success__title', this.element);
        this.descElement = ensureElement<HTMLParagraphElement>('.order-success__description', this.element);
        this.buttonElement = ensureElement<HTMLButtonElement>('.order-success__close', this.element);
        this.buttonElement.addEventListener('click', () => {
            console.log("click on button");
            // this.events.emit('card:select');
        });

        this.render();
    }

    render() {
        this.descElement.textContent = "Списано " + this.price + " синапсов";
        return this.element;
    }
}