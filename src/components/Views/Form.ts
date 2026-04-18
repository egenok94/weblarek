import { IBuyer } from "../../types";
import { ensureAllElements, ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

export class Form {
    protected form: HTMLFormElement;
    protected errorElement: HTMLSpanElement;
    protected nextButton: HTMLButtonElement;
    protected allInputs: HTMLInputElement[];

    constructor(protected events: IEvents, formcontainer: HTMLFormElement){
        this.form = formcontainer;
        this.errorElement = ensureElement<HTMLSpanElement>(".form__errors", this.form);
        this.nextButton = ensureElement<HTMLButtonElement>(".button", this.form);
        this.allInputs = ensureAllElements<HTMLInputElement>(".form__input", this.form);
        this.initInputListener();
    }

    private initInputListener() {
        this.allInputs.forEach(input => {
            input.addEventListener('input', () => {
                this.events.emit("buyer:form:changed", {name: input.name, value: input.value});
            });
        });
    }

    clearInputs() {
        this.allInputs.forEach(input => input.value = "");
    }

}