import './scss/styles.scss';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';
import { Products } from './components/Models/Products';
import { apiProducts } from './utils/data';
import { Buyer } from './components/Models/Buyer';
import { Purchase } from './components/Models/Purchase';
import { dataFromAPI } from './components/dataFromAPI';

/* Model for Products */
const productsModel = new Products();
productsModel.setItems(apiProducts.items);

console.log("setItems: ", productsModel.products);

console.log("getItems:", productsModel.getItems());

console.log("getItemById:", productsModel.getItemById("c101ab44-ed99-4a54-990d-47aa2bb4e7d9"));

console.log("getItemById:", productsModel.getItemById("c101ab44-ed99-4a54-990d-47aa2"));

productsModel.setItem("b06cde61-912f-4663-9751-09956c0eed67");

console.log("selected: ", productsModel.selectedproduct);

console.log("getDetailCard: ", productsModel.getDetailCard());


/* Model for Buyer */
const buyerModel = new Buyer();

console.log("getBuyer: ", buyerModel.getBuyer());
console.log("checkValidation: ", buyerModel.checkValidation(buyerModel.getBuyer()));

buyerModel.setPayment("card");

console.log("setPayment: ", buyerModel.payment);

console.log("checkValidation: ", buyerModel.checkValidation(buyerModel.getBuyer()));

buyerModel.setAddress("kdfjhgkdfh fkfdh khdfkghdfkhg kdfhgk h");

console.log("setAddress: ", buyerModel.address);

console.log("checkValidation: ", buyerModel.checkValidation(buyerModel.getBuyer()));

buyerModel.setEmail("kdjfhgkdfhg hfdgh");

console.log("setEmail: ", buyerModel.email);

console.log("checkValidation: ", buyerModel.checkValidation(buyerModel.getBuyer()));

buyerModel.setPhone("24545151");

console.log("setPhone: ", buyerModel.phone);

console.log("checkValidation: ", buyerModel.checkValidation(buyerModel.getBuyer()));

console.log("getBuyer: ", buyerModel.getBuyer());

buyerModel.clearBuyer();

console.log("clearBuyer: ", buyerModel.getBuyer());


/*Model for Purchase */

const purchaseModel = new Purchase();

console.log (purchaseModel);

purchaseModel.addProduct(productsModel.getItemById("c101ab44-ed99-4a54-990d-47aa2bb4e7d9"));
purchaseModel.addProduct(productsModel.getItemById("412bcf81-7e75-4e70-bdb9-d3c73c9803b7"));

console.log ("addProduct: ", purchaseModel);
console.log("getProducts: ", purchaseModel.getProducts());
console.log("getCost: ", purchaseModel.getCost());
console.log("getCount: ", purchaseModel.getCount());

console.log("checkProduct true: ", purchaseModel.checkProduct("412bcf81-7e75-4e70-bdb9-d3c73c9803b7"));
console.log("checkProduct false: ", purchaseModel.checkProduct("412bcf81-7e75-4e70-bdb9-d3c7"));

purchaseModel.deleteProduct(productsModel.getItemById("412bcf81-7e75-4e70-bdb9-d3c73c9803b7"));
console.log("deleteProduct: ", purchaseModel.getProducts());

purchaseModel.clearPurchase();
console.log("clearPurchase: ", purchaseModel.getProducts());


/*get data form Server */

const ApiInstance = new Api(API_URL);
const dataFromServer = new dataFromAPI(ApiInstance);

console.log(await dataFromServer.getApiProducts("/product/"));

const allData = await dataFromServer.getApiProducts("/product/")
productsModel.setItems(allData.items);

console.log("dataFromServer: ", productsModel.getItems());

