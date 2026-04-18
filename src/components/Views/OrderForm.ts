import { IBuyer } from "../../types";
import { cloneTemplate, ensureElement, ensureAllElements } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form } from "./Form";

export class OrderForm extends Form {
    protected element: HTMLFormElement;
    protected orderButtons: HTMLButtonElement[];
    

    constructor(protected events: IEvents) {
        const orderForm = cloneTemplate<HTMLFormElement>("#order");
        super(events, orderForm);
        this.element = orderForm;

        this.orderButtons = ensureAllElements<HTMLButtonElement>(".button_alt", this.form);
        this.orderButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.events.emit("buyer:form:changed", {name: "payment", value: button.name});
            })
        })

        this.nextButton!.onclick = (e) => {
            e.preventDefault();
            this.events.emit("modal:secondform");
        }
    }

    render() {
        return this.element;
    }

    setErrorsFirst(data: Partial<Record<keyof IBuyer, string>>){
            const errorMessage = [data.payment, data.address].filter(Boolean).join(', ');
            this.nextButton.disabled = errorMessage.length !== 0
            this.errorElement.textContent = errorMessage;
        }

    setFields(payment: string, address: string) {
        this.orderButtons.forEach(btn => {
            btn.classList.toggle("button_alt-active", btn.name === payment);
        })

        this.allInputs.forEach(input => {
            if (input.name == "address"){
                input.value = address;
            }
        })
    }

    clearFields() {
        this.orderButtons.forEach(btn => {
            btn.classList.remove("button_alt-active");
        })
        this.nextButton.disabled = true;
        this.clearInputs();
    }
}