import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface IGalleryList {
    catalog: HTMLElement[];
}

export class GalleryList extends Component<IGalleryList> {
    protected gallery: HTMLElement;

    constructor(nameContainer: string) {
            const container = ensureElement<HTMLElement>(nameContainer);
            super(container);

            this.gallery = container;
    }

    set catalog(items: HTMLElement[]) {
        this.gallery.innerHTML = "";
        
        items.forEach(item => {
            this.gallery.appendChild(item);
        })
    }
}