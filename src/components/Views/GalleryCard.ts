import { getCalss, getImage } from "../../utils/utils";
import { IProduct } from "../../types";
import { IEvents } from "../base/Events";
import { CardMoreDetail } from "./CardMoreDetail";

export class GalleryCrad extends CardMoreDetail{
    protected element: HTMLButtonElement;

    constructor(rootcontainer: HTMLButtonElement, protected events: IEvents, item: IProduct) {       
        super(rootcontainer);
        this.element = rootcontainer;
        this.element.addEventListener('click', () => {
            this.events.emit("card:selected", item);
        });

        this.render(item);
    }

    render(item: IProduct) {
        this.imageElement.src = getImage(item.image);
        this.titleElement.textContent = item.title;
        this.categoryElement.textContent = item.category;
        this.categoryElement = getCalss(this.categoryElement, item.category);
        this.priceElement.textContent = item.price === null ? "Бесценно" : item.price + " синапсов";
        return this.element;
    }
}