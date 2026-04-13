import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export class Modal extends Component<HTMLDivElement> {
    protected contentElement: HTMLDivElement;
    protected closeButton: HTMLButtonElement;

    constructor(rootcontainer: string) {
        const container = ensureElement<HTMLDivElement>(rootcontainer)
        super(container);
        this.closeButton = ensureElement<HTMLButtonElement>(".modal__close", this.container);
        this.contentElement = ensureElement<HTMLDivElement>(".modal__content", this.container);

        this.closeButton.addEventListener('click', () => {
            console.log("click on closeButton");
            // this.events.emit('card:select');
        });
   }

   set content(element: HTMLElement) {
          this.contentElement.innerHTML = "";
        this.contentElement.appendChild(element);
   }
}