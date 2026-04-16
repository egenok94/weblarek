import { IProduct } from "../../types";
import { ensureElement, getCalss, getImage } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { CardMoreDetail } from "./CardMoreDetail";

export class CardPreview extends CardMoreDetail{
    protected element: HTMLDivElement;
    protected descElement: HTMLParagraphElement;
    protected buttonElement: HTMLButtonElement;
    protected hasInBusket? : boolean;

    constructor(rootcontainer: HTMLDivElement, protected events: IEvents) {
        super(rootcontainer);
        this.element = rootcontainer;
        this.descElement = ensureElement<HTMLParagraphElement>(".card__text", this.element);
        this.buttonElement = ensureElement<HTMLButtonElement>(".button", this.element);
    }

    render(item: IProduct) {
        this.imageElement.src = getImage(item.image);
        this.titleElement.textContent = item.title;
        this.categoryElement.textContent = item.category;
        this.categoryElement = getCalss(this.categoryElement, item.category);
        this.priceElement.textContent = item.price === null ? "Бесценно" : item.price + " синапсов";
        this.buttonElement.disabled = item.price === null ? true : false;
        return this.element;
    }

    updateButton(hasInBusket: boolean) {
        if (hasInBusket) {
            this.buttonElement.textContent = "Удалить из корзины";
            this.buttonElement.onclick = () => {
                this.events.emit("card:delete-from-preview");
            }
        } else {

            this.buttonElement.textContent = (this.priceElement.textContent === "Бесценно") ? "Недоступно" : "Купить";
            this.buttonElement.onclick = () => {
                this.events.emit("card:tobusket");
            }
        }
    }
}