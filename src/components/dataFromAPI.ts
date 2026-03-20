import { IApi } from "../types";


export class dataFromAPI {
    api: IApi

    constructor(api: IApi) {
        this.api = api;
    }

    async getApiProducts<T extends object>(uri: string): Promise<T> {
        return this.api.get(uri);
    }

    async sendData<T extends object>(uri: string, data: object): Promise<T>{
        return this.api.post(uri, data);
    }

}