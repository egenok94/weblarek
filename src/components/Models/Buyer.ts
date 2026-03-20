import { IBuyer } from "../../types";
import { TPayment } from "../../types";

export class Buyer implements IBuyer {
    payment: TPayment;
    email: string;
    phone: string;
    address: string;

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

    checkValidation(buyer: IBuyer): Object {
        let result = {
            paymentError: "",
            addressError: "",
            emailError: "",
            phoneError: ""
        }

        if (buyer.payment === "") {
            result.paymentError = "Не выбран способ оплаты";
        }
        
        if (buyer.address === "") {
            result.addressError = "Необходимо указать адрес";
        }

        if (buyer.email === "") {
            result.emailError = "Необходимо указать email";
        }
        
        if (buyer.phone === "") {
            result.phoneError = "Необходимо указать номер телефона";
        }

        return result;
    }
}