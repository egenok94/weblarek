import { IProduct } from "../../types";
import { ensureElement, getCalss, getImage } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export class CardPreview extends Component<HTMLDivElement>{
    protected element: HTMLDivElement;
    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLSpanElement;
    protected titleElement: HTMLHeadElement;
    protected descElement: HTMLParagraphElement;
    protected buttonElement: HTMLButtonElement;
    protected priceElement: HTMLSpanElement;
    protected hasInBusket : boolean;

    constructor(rootcontainer: HTMLDivElement, inBusket: boolean, protected events: IEvents) {
        super(rootcontainer);
        this.element = rootcontainer;
        this.hasInBusket = inBusket;
        this.imageElement = ensureElement<HTMLImageElement>(".card__image", this.element);
        this.categoryElement = ensureElement<HTMLSpanElement>(".card__category", this.element);
        this.titleElement = ensureElement<HTMLHeadElement>(".card__title", this.element);
        this.descElement = ensureElement<HTMLParagraphElement>(".card__text", this.element);
        this.buttonElement = ensureElement<HTMLButtonElement>(".button", this.element);
        this.priceElement = ensureElement<HTMLSpanElement>(".card__price", this.element);
    }

    render(item: IProduct) {
        this.imageElement.src = getImage(item.image);
        this.titleElement.textContent = item.title;
        this.categoryElement.textContent = item.category;
        this.categoryElement = getCalss(this.categoryElement, item.category);
        this.priceElement.textContent = item.price === null ? "Бесценно" : item.price + " синапсов";
        this.updateButton(this.hasInBusket);
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