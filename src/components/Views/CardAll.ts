import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export abstract class CardALL extends Component<HTMLElement>{
    protected titleElement: HTMLElement;
    protected priceElement: HTMLSpanElement;


    constructor(rootcontainer: HTMLElement) {
        super(rootcontainer);
        this.titleElement = ensureElement(".card__title", rootcontainer);
        this.priceElement = ensureElement(".card__price", rootcontainer);
        
    }

}