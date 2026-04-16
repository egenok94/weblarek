import { ensureAllElements, ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

export class Form {
    protected form: HTMLFormElement;
    protected errorElement: HTMLSpanElement;
    protected nextButton: HTMLButtonElement;

    constructor(protected events: IEvents, formcontainer: HTMLFormElement){
        this.form = formcontainer;
        this.errorElement = ensureElement<HTMLSpanElement>(".form__errors", this.form);
        this.nextButton = ensureElement<HTMLButtonElement>(".button", this.form);
        this.initInputListener();
    }

    private initInputListener() {
        const allInput = ensureAllElements<HTMLInputElement>(".form__input", this.form);

        allInput.forEach(input => {
            input.addEventListener('input', () => {
                this.events.emit("buyer:change", {name: input.name, value: input.value});
            });
        });
    }

}