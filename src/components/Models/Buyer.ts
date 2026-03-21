import { IBuyer } from "../../types";
import { TPayment } from "../../types";

export class Buyer{
    private payment: TPayment;
    private email: string;
    private phone: string;
    private address: string;

    constructor() {
        this.payment = "";
        this.address = "";
        this.phone = "";
        this.email = "";
    }

    setPayment(payment: TPayment): void {
        this.payment = payment;
    }

    setAddress(address: string): void {
        this.address = address;
    }

    setPhone(phone: string): void {
        this.phone = phone;
    }

    setEmail(email: string): void {
        this.email = email;
    }

    getBuyer(): void {
        return this;
    }

    clearBuyer(): void {
        this.payment = "";
        this.address = "";
        this.phone = "";
        this.email = "";
    }

    checkValidation(): Partial<Record<keyof IBuyer, string>> {
        const result = {
            payment: "",
            address: "",
            email: "",
            phone: ""
        }

        if (this.payment === "") {
            result.payment = "Не выбран способ оплаты";
        }
        
        if (this.address === "") {
            result.address = "Необходимо указать адрес";
        }

        if (this.email === "") {
            result.email = "Необходимо указать email";
        }
        
        if (this.phone === "") {
            result.phone = "Необходимо указать номер телефона";
        }

        return result;
    }
}