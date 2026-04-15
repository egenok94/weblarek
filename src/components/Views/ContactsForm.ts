import { cloneTemplate, ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form } from "./Form";

export class ContactsForm extends Form {
    protected element: HTMLFormElement;
    

    constructor(protected events: IEvents) {
        const orderForm = cloneTemplate<HTMLFormElement>("#contacts");
        super(events, orderForm);
        this.element = orderForm;
        this.nextButton = ensureElement<HTMLButtonElement>("[name='contacts'] .button", this.element);
    }

    render() {
        return this.element;
    }
}