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
                this.events.emit("buyer:change", {name: "payment", value: button.name});
            })
        })
    }

    render() {
        return this.element;
    }

    setErrorsFirst(data: Partial<Record<keyof IBuyer, string>>){
            if (data.payment !== ""){
                this.errorElement.textContent = data.payment!;
            }
            if (data.payment == "" && data.address !== "") {
                this.errorElement.textContent = data.address!;
            }
            if (data.payment == "" && data.address == "") {
                this.errorElement.textContent = "";
                this.nextButton!.disabled = false;
                this.nextButton!.onclick = (e) => {
                    e.preventDefault();
                    this.events.emit("modal:secondform");
                }
            }
        }

        setPaymentButtons(choice: string) {
            this.orderButtons.forEach(btn => {
                if(btn.name === choice) {
                    btn.classList.toggle("button_alt-active");
                } else {
                    btn.classList.remove("button_alt-active");
                }
            })
        }
}