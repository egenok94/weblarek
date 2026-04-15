import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export class Modal extends Component<HTMLDivElement> {
    protected contentElement: HTMLDivElement;
    protected closeButton: HTMLButtonElement;

    constructor(rootcontainer: string, protected events: IEvents) {
        const container = ensureElement<HTMLDivElement>(rootcontainer)
        super(container);
        this.closeButton = ensureElement<HTMLButtonElement>(".modal__close", this.container);
        this.contentElement = ensureElement<HTMLDivElement>(".modal__content", this.container);

        this.closeButton.addEventListener('click', () => {
            this.events.emit("modal:close");
        });

        this.container.addEventListener('click', (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (target === this.container) {
                this.events.emit("modal:close");
            }
        });

   }

   set content(element: HTMLElement) {
        this.contentElement.innerHTML = "";
        this.contentElement.appendChild(element);
        this.events.emit("modal:open");
   }

   openModal() {
    this.container.classList.add("modal_active");
   }

   closeModal() {
    this.container.classList.remove("modal_active");
   }
}