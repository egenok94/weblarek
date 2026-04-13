import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export class Contacts extends Component<HTMLFormElement> {
    protected element: HTMLFormElement;
    protected emailElement: HTMLInputElement;
    protected nextButtonElement: HTMLButtonElement;
    protected errorElement: HTMLSpanElement;
    protected phoneElement: HTMLInputElement;
    

    constructor(rootcontainer: HTMLFormElement) {
        super(rootcontainer);
        this.element = rootcontainer;
        this.emailElement = ensureElement<HTMLInputElement>("[name='email']", this.element);
        this.phoneElement = ensureElement<HTMLInputElement>("[name='phone']", this.element);
        this.nextButtonElement = ensureElement<HTMLButtonElement>(".button", this.element);
        this.errorElement = ensureElement<HTMLSpanElement>(".form__errors", this.element);

        this.emailElement.addEventListener('input', () => {
            console.log("change emailElement");
            // this.events.emit('card:select');
        });

        this.phoneElement.addEventListener('input', () => {
            console.log("change phoneElement");
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