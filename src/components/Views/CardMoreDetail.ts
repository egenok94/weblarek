import { ensureElement } from "../../utils/utils";
import { CardALL } from "./CardAll";

export abstract class CardMoreDetail extends CardALL {
    protected element: HTMLElement;
    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLSpanElement;

    
    constructor(rootcontainer: HTMLElement) {
        super(rootcontainer);
        this.element = rootcontainer;
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.element);
        this.categoryElement = ensureElement<HTMLSpanElement>('.card__category', this.element);
    }
}