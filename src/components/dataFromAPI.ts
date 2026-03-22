import { IApi, IOrder, IOrderResponse, IProductResponse } from "../types";

export class DataFromAPI {
    private api: IApi

    constructor(api: IApi) {
        this.api = api;
    }

    async getApiProducts(): Promise<IProductResponse> {
        return this.api.get<IProductResponse>("/product/");
    }

    async sendData(data: IOrder): Promise<IOrderResponse>{
        return this.api.post<IOrderResponse>("/order/", data);
    }
}