import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export class OrderForm extends Component<HTMLFormElement> {
    protected element: HTMLFormElement;
    protected cardElement: HTMLButtonElement;
    protected cashElement: HTMLButtonElement;
    protected addressElement: HTMLInputElement;
    protected nextButtonElement: HTMLButtonElement;
    protected errorElement: HTMLSpanElement;
    

    constructor(rootcontainer: HTMLFormElement) {
        super(rootcontainer);
        this.element = rootcontainer;
        this.cardElement = ensureElement<HTMLButtonElement>("[name='card']", this.element);
        this.cashElement = ensureElement<HTMLButtonElement>("[name='cash']", this.element);
        this.addressElement = ensureElement<HTMLInputElement>("[name=address]", this.element);
        this.nextButtonElement = ensureElement<HTMLButtonElement>(".order__button", this.element);
        this.errorElement = ensureElement<HTMLSpanElement>(".form__errors", this.element);
        this.cardElement.addEventListener('click', () => {
            console.log("click on card button",  this.cardElement.name);
            // this.events.emit('card:select');
        });

        this.cashElement.addEventListener('click', () => {
            console.log("click on cash button",  this.cashElement.name);
            // this.events.emit('card:select');
        });

        this.addressElement.addEventListener('input', () => {
            console.log("change addressElement");
            // this.events.emit('card:select');
        });

        this.nextButtonElement.addEventListener('click', () => {
            console.log("click on nextButton");
            // this.events.emit('card:select');
        });

    }

    render() {
        return this.element;
    }
}