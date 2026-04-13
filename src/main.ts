import './scss/styles.scss';
import { Products } from './components/Models/Products';
import { Buyer } from './components/Models/Buyer';
import { Purchase } from './components/Models/Purchase';
import { GalleryCrad } from './components/Views/GalleryCard';
import { cloneTemplate } from './utils/utils';
import { GalleryList } from './components/Views/GalleryList';
import { CardPreview } from './components/Views/CardPreview';
import { Modal } from './components/Views/Modal';
import { BusketModal } from './components/Views/BusketModal';
import { BusketListItem } from './components/Views/BusketListItem';
import { Success } from './components/Views/Success';
import { OrderForm } from './components/Views/OrderForm';
import { Contacts } from './components/Views/Contacts';
import { Presenter } from './Presenter/Presenter';


const presenter = new Presenter();

await presenter.init();




/* Model for Products */

// const productsModel = new Products();

// console.log("---------------Model for Products---------------");
// // productsModel.setItems(allData.items);

// console.log("getItems:", productsModel.getItems());

// console.log("getItemById:", productsModel.getItemById("c101ab44-ed99-4a54-990d-47aa2bb4e7d9"));

// productsModel.setItem("b06cde61-912f-4663-9751-09956c0eed67");

// console.log("selected: ", productsModel.selectedproduct);

// console.log("getDetailCard: ", productsModel.getDetailCard());

/* Model for Buyer */
// console.log("---------------Model for Buyer---------------");
// const buyerModel = new Buyer();

// console.log("getBuyer: ", buyerModel.getBuyer());
// console.log("checkValidation: ", buyerModel.checkValidation(buyerModel.getBuyer()));

// buyerModel.setPayment("card");

// console.log("setPayment: ", buyerModel.payment);

// console.log("checkValidation: ", buyerModel.checkValidation(buyerModel.getBuyer()));

// buyerModel.setAddress("kdfjhgkdfh fkfdh khdfkghdfkhg kdfhgk h");

// console.log("setAddress: ", buyerModel.address);

// console.log("checkValidation: ", buyerModel.checkValidation(buyerModel.getBuyer()));

// buyerModel.setEmail("kdjfhgkdfhg hfdgh");

// console.log("setEmail: ", buyerModel.email);

// console.log("checkValidation: ", buyerModel.checkValidation(buyerModel.getBuyer()));

// buyerModel.setPhone("24545151");

// console.log("setPhone: ", buyerModel.phone);

// console.log("checkValidation: ", buyerModel.checkValidation(buyerModel.getBuyer()));

// console.log("getBuyer: ", buyerModel.getBuyer());

// buyerModel.clearBuyer();

// console.log("clearBuyer: ", buyerModel.getBuyer());


/*Model for Purchase */
// console.log("---------------Model for Purchase---------------");

// const purchaseModel = new Purchase();

// console.log (purchaseModel);

// console.log ("addProduct: ");
// purchaseModel.addProduct(productsModel.getItemById("c101ab44-ed99-4a54-990d-47aa2bb4e7d9"));
// purchaseModel.addProduct(productsModel.getItemById("412bcf81-7e75-4e70-bdb9-d3c73c9803b7"));
// purchaseModel.addProduct(productsModel.getItemById("412bcf81-7e75-4e70-bdb9-d3c73c9803b7"));

// console.log("getProducts: ", purchaseModel.getProducts());
// console.log("getCost: ", purchaseModel.getCost());
// console.log("getCount: ", purchaseModel.getCount());

// console.log("checkProduct true: ", purchaseModel.checkProduct("412bcf81-7e75-4e70-bdb9-d3c73c9803b7"));
// console.log("checkProduct false: ", purchaseModel.checkProduct("412bcf81-7e75-4e70-bdb9-d3c7"));

// purchaseModel.deleteProduct(productsModel.getItemById("412bcf81-7e75-4e70-bdb9-d3c73c9803b7"));
// console.log("deleteProduct: ", purchaseModel.getProducts());

// // purchaseModel.clearPurchase();
// console.log("clearPurchase: ", purchaseModel.getProducts());

// console.log("---------------card Prview---------------");
// const cardPreview = new CardPreview(cloneTemplate("#card-preview"), data[1], purchaseModel.checkProduct(data[1].id));

// console.log(cardPreview.render(data[2]));

// const cardFormModal = cardPreview.render(data[1]);

// console.log("---------------Modal---------------");

// const modal = new Modal("#modal-container");

// console.log("---------------Modal with card preview---------------");

// modal.content = cardFormModal;

// document.querySelector("#modal-container").classList.add("modal_active");

// console.log("---------------Busket Modal---------------");

// const busketModal = new BusketModal(cloneTemplate("#basket"), purchaseModel.getCost());

// const basketToModal = busketModal.render();

// console.log("---------------Modal with empty busket---------------");

// modal.content = basketToModal;

// console.log("---------------Busket items---------------");

// const busketItems = purchaseModel.getProducts();
// console.log(busketItems);

// busketItems.forEach(item => {
//         const busketListItem = new BusketListItem(cloneTemplate("#card-basket"), item, busketItems.indexOf(item)+1 );
//         busketModal.content = busketListItem.render(item);
// });


// const success = new Success(cloneTemplate("#success"), purchaseModel.getCost());

// const successToModal = success.render();

// modal.content = successToModal;

// console.log("---------------Order Form---------------");

// const order = new OrderForm(cloneTemplate("#order"));
// const orderToModal = order.render();
// console.log(orderToModal);

// modal.content = orderToModal;

// console.log("---------------Order Form---------------");

// const contscts = new Contacts(cloneTemplate("#contacts"));
// const contsctsToModal = contscts.render();
// console.log(orderToModal);

// modal.content = contsctsToModal;
