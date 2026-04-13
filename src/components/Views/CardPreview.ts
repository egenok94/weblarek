import { IProduct } from "../../types";
import { ensureElement, getCalss, getImage } from "../../utils/utils";
import { Component } from "../base/Component";

export class CardPreview extends Component<HTMLDivElement>{
    protected element: HTMLDivElement;
    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLSpanElement;
    protected titleElement: HTMLHeadElement;
    protected descElement: HTMLParagraphElement;
    protected buttonElement: HTMLButtonElement;
    protected priceElement: HTMLSpanElement;
    protected hasInBusket : boolean;

    constructor(rootcontainer: HTMLDivElement, item: IProduct, inBusket: boolean) {
        super(rootcontainer);
        this.element = rootcontainer;
        this.hasInBusket = inBusket;
        this.imageElement = ensureElement<HTMLImageElement>(".card__image", this.element);
        this.categoryElement = ensureElement<HTMLSpanElement>(".card__category", this.element);
        this.titleElement = ensureElement<HTMLHeadElement>(".card__title", this.element);
        this.descElement = ensureElement<HTMLParagraphElement>(".card__text", this.element);
        this.buttonElement = ensureElement<HTMLButtonElement>(".button", this.element);
        this.priceElement = ensureElement<HTMLSpanElement>(".card__price", this.element);

        this.render(item);

    }

    render(item: IProduct) {
        this.imageElement.src = getImage(item.image);
        this.titleElement.textContent = item.title;
        this.categoryElement.textContent = item.category;
        this.categoryElement = getCalss(this.categoryElement, item.category);
        this.priceElement.textContent = item.price === null ? "Бесценно" : item.price + " синапсов";
        if (this.hasInBusket) {
            this.buttonElement.textContent = "Удалить из корзины";
        } else {
            this.buttonElement.textContent = (item.price === null) ? "Недоступно" : "Купить";
        }
        this.buttonElement.disabled = item.price === null ? true : false;
        return this.element;
    }
}