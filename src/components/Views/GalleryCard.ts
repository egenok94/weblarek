import { Component } from "../base/Component";
import { ensureElement, getCalss, getImage } from "../../utils/utils";
import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class GalleryCrad extends Component<HTMLButtonElement>{
    protected imageElement: HTMLImageElement;
    protected titleElement: HTMLHeadingElement;
    protected cardCategoryElement: HTMLSpanElement;
    protected priceElement: HTMLSpanElement;
    protected element: HTMLButtonElement;

    constructor(rootcontainer: HTMLButtonElement, protected events: IEvents, item: IProduct) {       
        super(rootcontainer);
        this.element = rootcontainer;
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.element);
        this.titleElement = ensureElement<HTMLHeadingElement>('.card__title', this.element);
        this.cardCategoryElement = ensureElement<HTMLSpanElement>('.card__category', this.element);
        this.priceElement = ensureElement<HTMLSpanElement>('.card__price', this.element);
        this.element.addEventListener('click', () => {
            this.events.emit("card:open", item);
        });

        this.render(item);
    }

    render(item: IProduct) {
        this.imageElement.src = getImage(item.image);
        this.titleElement.textContent = item.title;
        this.cardCategoryElement.textContent = item.category;
        this.cardCategoryElement = getCalss(this.cardCategoryElement, item.category);
        this.priceElement.textContent = item.price === null ? "Бесценно" : item.price + " синапсов";
        return this.element;
    }
}