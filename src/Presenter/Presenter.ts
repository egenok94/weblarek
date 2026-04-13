import { Api } from "../components/base/Api";
import { EventEmitter } from "../components/base/Events";
import { DataFromAPI } from "../components/DataFromAPI";
import { Buyer } from "../components/Models/Buyer";
import { Products } from "../components/Models/Products";
import { Purchase } from "../components/Models/Purchase";
import { Contacts } from "../components/Views/Contacts";
import { GalleryCrad } from "../components/Views/GalleryCard";
import { GalleryList } from "../components/Views/GalleryList";
import { Modal } from "../components/Views/Modal";
import { OrderForm } from "../components/Views/OrderForm";
import { API_URL } from "../utils/constants";
import { cloneTemplate } from "../utils/utils";

export class Presenter {
    protected productsModel: Products;
    protected buyerModel: Buyer;
    protected purchaseModel: Purchase;
    protected dataFromServer: DataFromAPI;
    protected galleryList: GalleryList;
    // protected cardCatalog: GalleryCrad;
    protected modal: Modal;
    protected orderForm: OrderForm;
    protected contsctsForm: Contacts;
    protected events: EventEmitter;

    constructor(){
        this.events = new EventEmitter();
        this.productsModel = new Products(this.events);
        this.buyerModel = new Buyer();
        this.purchaseModel = new Purchase();
        this.dataFromServer = new DataFromAPI(new Api(API_URL));
        this.galleryList = new GalleryList(".gallery");
        //this.cardCatalog = new GalleryCrad(cloneTemplate("#card-catalog"), item);
        //cardPreview
        this.modal = new Modal("#modal-container");
        //busketModal
        //busketListItem
        this.orderForm = new OrderForm(cloneTemplate("#order"));
        this.contsctsForm = new Contacts(cloneTemplate("#contacts"));
    }

    async init() {
        await this.loadData();
        this.initialization();
    }

    async loadData(){
        try {
            this.productsModel.setItems(Array.from(await this.dataFromServer.getApiProducts().then(res => res.items)));
        }
        catch(err) {
            console.error("Не удалось загрузить каталог", err);
        }
    }

    initialization(){
        //отображение карточек в каталоге
        
        // this.events.on("catalog:change", () => {
                let allGalleryCard: HTMLElement[] = [];
                console.log("catalog:change getItems", this.productsModel.getItems());
                this.productsModel.getItems().forEach(item => {
                    const cardCatalog = new GalleryCrad(cloneTemplate("#card-catalog"), item);
                    allGalleryCard.push(cardCatalog.render(item));
                })
                this.galleryList.catalog = allGalleryCard;
                console.log(this.galleryList.catalog);
        //     }
        // );

        
    }
}