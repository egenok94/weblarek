import { Api } from "../base/Api.ts";
import { EventEmitter } from "../base/Events.ts";
import { DataFromAPI } from "../DataFromAPI.ts";
import { Buyer } from "../Models/Buyer.ts";
import { Products } from "../Models/Products.ts";
import { Purchase } from "../Models/Purchase.ts";
import { BusketListItem } from "../Views/BusketListItem.ts";
import { BusketModal } from "../Views/BusketModal.ts";
import { CardPreview } from "../Views/CardPreview.ts";
import { ContactsForm } from "../Views/ContactsForm.ts";
import { GalleryCrad } from "../Views/GalleryCard.ts";
import { GalleryList } from "../Views/GalleryList.ts";
import { Header } from "../Views/Header.ts";
import { Modal } from "../Views/Modal.ts";
import { OrderForm } from "../Views/OrderForm.ts";
import { Success } from "../Views/Success.ts";
import { IBuyer, IProduct, TPayment } from "../../types/index.ts";
import { API_URL } from "../../utils/constants.ts";
import { cloneTemplate } from "../../utils/utils.ts";

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
    protected currentCardPreview: CardPreview;
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
        this.currentCardPreview = new CardPreview(cloneTemplate("#card-preview"), this.events);
    }

    init() {
        this.loadData();
        this.initialization();
    }

    async loadData(){
        try {
            const fromServer = await this.dataFromServer.getApiProducts().then(res => res.items)
            this.productsModel.setItems(Array.from(fromServer));
        }
        catch(err) {
            console.error("Не удалось загрузить каталог", err);
        }
    }

    initialization(){
        
        this.events.on("catalog:change", () => {
            this.galleryList.catalog = this.productsModel.getItems().map(item => {
                const cardCatalog = new GalleryCrad(cloneTemplate("#card-catalog"), this.events, item);
                return cardCatalog.render(item);
            });
        });

        this.events.on("card:open", () => {
            this.modal.content = this.currentCardPreview!.render(this.productsModel.getDetailCard()!);
        });

        this.events.on("card:selected", (item:IProduct) => {
            this.productsModel.setItem(item.id);
            this.currentCardPreview?.updateButton(this.purchaseModel.checkProduct(item.id));
            
        })

        this.events.on("modal:open", () => {
            this.modal.openModal();
        });

        this.events.on("modal:close", () => {
            this.modal.closeModal();
        });

        this.events.on("basket:open", () => {
            this.modal.content = this.busketModal.render();
        });

        this.events.on("cardPreview: action", () => {
            const detailCard= this.productsModel.getDetailCard()
            if (this.purchaseModel.checkProduct(detailCard!.id)) {
                this.purchaseModel.deleteProduct(detailCard!);
            } else{
                this.purchaseModel.addProduct(detailCard!);
            }
        })

        this.events.on("card:delete-from-busket", (item:IProduct) => {
            this.purchaseModel.deleteProduct(item);
        })

        this.events.on("busket:change", () => {
            this.header.counter = this.purchaseModel.getCount();
            this.busketModal.content = [];
            const busketItems = this.purchaseModel.getProducts();
            this.busketModal.content = busketItems.map(item =>{
                const busketListItem = new BusketListItem(cloneTemplate("#card-basket"), this.events, item, busketItems.indexOf(item)+1);
                return busketListItem.render(item);
            })
            
            this.currentCardPreview!.updateButton(this.purchaseModel.checkProduct(this.productsModel.getDetailCard()!.id));

            this.busketModal.setCost(this.purchaseModel.getCost());
        })


        this.events.on("modal:firstform", () => {
            this.modal.content = this.orderForm.render();
        })

        this.events.on("buyer:form:changed", (data : {name:string, value: TPayment}) => {
                if (data.name === "payment") {
                    this.buyerModel.setPayment(data.value);
                }
                if (data.name === "address") {
                    this.buyerModel.setAddress(data.value);
                }
                if (data.name === "email") {
                    this.buyerModel.setEmail(data.value);
                }
                if (data.name === "phone") {
                    this.buyerModel.setPhone(data.value);
                }
        })

        this.events.on("buyer:setValueFirst",() => {
            this.orderForm.setErrorsFirst(this.buyerModel.checkValidation());

            const buyer  = this.buyerModel.getBuyer();
            this.orderForm.setFields(buyer["payment"], buyer["address"]);
            
        })

        this.events.on("buyer:setValueSecond",() => {
            this.contsctsForm.setErrorsSecond(this.buyerModel.checkValidation());

            const buyer  = this.buyerModel.getBuyer();
            this.contsctsForm.setFields(buyer["email"], buyer["phone"]);
            
        })

        this.events.on("modal:secondform", () =>{
            this.modal.content = this.contsctsForm.render();
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
                const senData = await this.dataFromServer.sendData(order);
                this.successModal.setCost(senData.total);
                this.modal.content = this.successModal.render();
                this.purchaseModel.clearPurchase();
                this.buyerModel.clearBuyer();
                
            } catch(err) {
                console.error("Не удалось отправить данные, попробуйте ещё раз", err);
            }
            
        })

        this.events.on("forms:clear", () =>{
            this.orderForm.clearFields();
            this.contsctsForm.clearFields();
        })
        
        
    }
}