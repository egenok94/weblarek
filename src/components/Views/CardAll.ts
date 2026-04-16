import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export abstract class CardALL extends Component<HTMLElement>{
    protected element: HTMLElement;
    protected titleElement: HTMLElement;
    protected priceElement: HTMLSpanElement;


    constructor(rootcontainer: HTMLElement) {
        super(rootcontainer);
        this.element = rootcontainer;
        this.titleElement = ensureElement(".card__title", this.element);
        this.priceElement = ensureElement(".card__price", this.element);
        
    }

}