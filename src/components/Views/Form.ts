import { IBuyer } from "../../types";
import { ensureAllElements, ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

export class Form {
    protected form: HTMLFormElement;
    protected errorElement: HTMLSpanElement;
    protected nextButton?: HTMLButtonElement | null = null;

    constructor(protected events: IEvents, formcontainer: HTMLFormElement){
        this.form = formcontainer;
        this.errorElement = ensureElement<HTMLSpanElement>(".form__errors", this.form);
        this.initList();
    }

    private initList() {
        const allInput = ensureAllElements<HTMLInputElement>(".form__input", this.form);

        allInput.forEach(input => {
            input.addEventListener('input', () => {
                this.events.emit("buyer:change", {name: input.name, value: input.value});
            });
        });

        const orderButtons = ensureAllElements<HTMLButtonElement>(".button_alt", this.form);

        orderButtons.forEach(button => {
            button.addEventListener('click', () => {
                button.classList.toggle("button_alt-active");
                orderButtons.filter(btn => btn.name !== button.name).forEach(el => {
                    el.classList.remove("button_alt-active");

                });

                this.events.emit("buyer:change", {name: "payment", value: button.name});
            })
        })
    }

    ensureButton() {
        if(this.form.name = "order") {
            this.nextButton = this.nextButton;
        } 
        
        if(this.form.name = "contacts"){
            this.nextButton = this.nextButton;
        }

    }

    validateFirst(data: Partial<Record<keyof IBuyer, string>>){
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
                this.nextButton = null;
            }
        }
    }

    validateSecond(data: Partial<Record<keyof IBuyer, string>>){
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