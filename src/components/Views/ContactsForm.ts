import { IBuyer } from "../../types";
import { cloneTemplate, ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form } from "./Form";

export class ContactsForm extends Form {
    protected element: HTMLFormElement;
    

    constructor(protected events: IEvents) {
        const orderForm = cloneTemplate<HTMLFormElement>("#contacts");
        super(events, orderForm);
        this.element = orderForm;
    }

    render() {
        return this.element;
    }

    setErrorsSecond(data: Partial<Record<keyof IBuyer, string>>){
        if(data.email !== "") {
            this.errorElement.textContent = data.email!;
        }
        if(data.email == "" && data.phone !== ""){
            this.errorElement.textContent = data.phone!;
        }
        if(data.email == "" && data.phone == ""){
            this.errorElement.textContent = "";
            this.nextButton!.disabled = false;
            this.nextButton!.onclick = (e) => {
                e.preventDefault();
                this.events.emit("modal:success");
            }
        }  
    }
}