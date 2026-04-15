import { Api } from "../components/base/Api";
import { EventEmitter } from "../components/base/Events";
import { DataFromAPI } from "../components/DataFromAPI.ts";
import { Buyer } from "../components/Models/Buyer";
import { Products } from "../components/Models/Products";
import { Purchase } from "../components/Models/Purchase";
import { BusketListItem } from "../components/Views/BusketListItem.ts";
import { BusketModal } from "../components/Views/BusketModal.ts";
import { CardPreview } from "../components/Views/CardPreview.ts";
import { ContactsForm } from "../components/Views/ContactsForm.ts";
import { GalleryCrad } from "../components/Views/GalleryCard";
import { GalleryList } from "../components/Views/GalleryList";
import { Header } from "../components/Views/Header.ts";
import { Modal } from "../components/Views/Modal";
import { OrderForm } from "../components/Views/OrderForm";
import { Success } from "../components/Views/Success.ts";
import { IProduct } from "../types/index.ts";
import { API_URL } from "../utils/constants";
import { cloneTemplate } from "../utils/utils";

export class Presenter {
    protected productsModel: Products;
    protected buyerModel: Buyer;
    protected purchaseModel: Purchase;
    protected dataFromServer: DataFromAPI;
    protected header: Header;
    protected galleryList: GalleryList;
    protected modal: Modal;
    protected orderForm: OrderForm;
    protected contsctsForm: ContactsForm;
    protected events: EventEmitter;
    protected busketModal: BusketModal;
    protected currentCardPreview: CardPreview | null = null;
    protected successModal: Success;
    

    constructor(){
        this.events = new EventEmitter();
        this.productsModel = new Products(this.events);
        this.buyerModel = new Buyer(this.events);
        this.purchaseModel = new Purchase(this.events);
        this.dataFromServer = new DataFromAPI(new Api(API_URL));
        this.header = new Header(".header", this.events);
        this.galleryList = new GalleryList(".gallery");
        this.modal = new Modal("#modal-container", this.events);
        this.orderForm = new OrderForm(this.events);
        this.contsctsForm = new ContactsForm(this.events);
        this.busketModal = new BusketModal(cloneTemplate("#basket"), this.events);
        this.successModal = new Success(cloneTemplate("#success"), this.events, this.purchaseModel.getCost());
    }

    init() {
        this.loadData();
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
        
        this.events.on("catalog:change", () => {
                let allGalleryCard: HTMLElement[] = [];
                this.productsModel.getItems().forEach(item => {
                    const cardCatalog = new GalleryCrad(cloneTemplate("#card-catalog"), this.events, item);
                    allGalleryCard.push(cardCatalog.render(item));
                })
                this.galleryList.catalog = allGalleryCard;
            }
        );

        this.events.on("card:open", (item:IProduct) =>{
            this.currentCardPreview = new CardPreview(cloneTemplate("#card-preview"), this.purchaseModel.checkProduct(item.id), this.events);
            this.productsModel.setItem(item.id);
        });

        this.events.on("card:selected", () => {
            this.modal.content = this.currentCardPreview!.render(this.productsModel.getDetailCard()!);
        })

        this.events.on("modal:open", () => {
            this.modal.openModal();
        });

        this.events.on("modal:close", () => {
            this.modal.closeModal();
            this.currentCardPreview = null;
        });

        this.events.on("basket:open", () => {
            this.modal.content = this.busketModal.render();
        });

        this.events.on("card:tobusket", () => {
            this.purchaseModel.addProduct(this.productsModel.getDetailCard()!);
        } );

        this.events.on("card:delete-from-busket", (item:IProduct) => {
            this.purchaseModel.deleteProduct(item);
        })

        this.events.on("card:delete-from-preview", () => {
            this.purchaseModel.deleteProduct(this.productsModel.getDetailCard()!);
            
        })

        this.events.on("busket:change", () => {
            this.header.counter = this.purchaseModel.getCount();
            this.busketModal.clearBusket();
            const busketItems = this.purchaseModel.getProducts();
            busketItems.forEach(item =>{
                const busketListItem = new BusketListItem(cloneTemplate("#card-basket"), this.events, item, busketItems.indexOf(item)+1);
                this.busketModal.content = busketListItem.render(item);
            })
            if(this.currentCardPreview) {
                this.currentCardPreview!.updateButton(this.purchaseModel.checkProduct(this.productsModel.getDetailCard()!.id));
            }

            this.busketModal.setCost(this.purchaseModel.getCost());
        })


        this.events.on("modal:firstform", () => {
            this.modal.content = this.orderForm.render();
            this.orderForm.ensureButton();
        })

        this.events.on("buyer:change", (data : {name:string, value: string}) => {
            const methodName = `set${data.name.charAt(0).toUpperCase() + data.name.slice(1)}`;
            (this.buyerModel as any)[methodName](data.value);
        })

        this.events.on("buyer:setValueFirst",() => {
            this.orderForm.validateFirst(this.buyerModel.checkValidation());
            
        })

        this.events.on("buyer:setValueSecond",() => {
            this.contsctsForm.validateSecond(this.buyerModel.checkValidation());
            
        })

        this.events.on("modal:secondform", () =>{
            this.modal.content = this.contsctsForm.render();
            this.contsctsForm.ensureButton();
        })

        this.events.on("modal:success", async () => {
            const buyer = this.buyerModel.getBuyer();
            const order = {
                items: this.purchaseModel.getProducts().map(prod => prod.id),
                total: this.purchaseModel.getCost(),
                payment: buyer["payment"],
                address: buyer["address"],
                email: buyer["email"],
                phone: buyer["phone"]
            }
            try {
                this.successModal.setCost(this.purchaseModel.getCost());
                this.modal.content = this.successModal.render();
                console.log(await this.dataFromServer.sendData(order));
                this.purchaseModel.clearPurchase();
                this.buyerModel.clearBuyer();
            } catch(err) {
                console.error("Не удалось отправить данные, попробуйте ещё раз", err);
            }
            
        })
        
        
    }
}