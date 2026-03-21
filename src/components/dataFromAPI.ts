import { IApi } from "../types";


export class DataFromAPI {
    private api: IApi

    constructor(api: IApi) {
        this.api = api;
    }

    async getApiProducts<T extends object>(): Promise<T> {
        return this.api.get("/product/");
    }

    async sendData<T extends object>(data: object): Promise<T>{
        return this.api.post("/order/", data);
    }

}