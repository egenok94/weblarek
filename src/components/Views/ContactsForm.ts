import { IBuyer } from "../../types";
import { cloneTemplate } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form } from "./Form";

export class ContactsForm extends Form {
    protected element: HTMLFormElement;
    

    constructor(protected events: IEvents) {
        const orderForm = cloneTemplate<HTMLFormElement>("#contacts");
        super(events, orderForm);
        this.element = orderForm;
        this.nextButton!.onclick = (e) => {
            e.preventDefault();
            this.events.emit("modal:success");
        }
    }

    render() {
        return this.element;
    }

    setErrorsSecond(data: Partial<Record<keyof IBuyer, string>>){
        const errorMessage = [data.email, data.phone].filter(Boolean).join(', ');
        this.nextButton.disabled = errorMessage.length !== 0
        this.errorElement.textContent = errorMessage;
    }

    setFields(email: string, phone: string){
        this.allInputs.forEach(input => {
            if (input.name == "email"){
                input.value = email;
            } 
            if (input.name == "phone"){
                input.value = phone;
            }
        })
    }
    
    clearFields() {
        this.clearInputs();
    }
}