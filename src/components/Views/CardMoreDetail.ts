import { ensureElement } from "../../utils/utils";
import { CardALL } from "./CardAll";

export abstract class CardMoreDetail extends CardALL {
    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLSpanElement;

    
    constructor(rootcontainer: HTMLElement) {
        super(rootcontainer);
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', rootcontainer);
        this.categoryElement = ensureElement<HTMLSpanElement>('.card__category', rootcontainer);
    }
}