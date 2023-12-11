import api from "./axiosClient";
import type { AxiosError } from "axios";
import { CreateStoreApiType } from "../interfaces/StoreInterface";

export const storeApi = {
    async createStore(storeData: CreateStoreApiType){
        try{
            const response = await api.post('/store', {
                ...storeData
            })
            return response;
        } catch (error) {
            const err = error as AxiosError
            return err.response;
        }
    },
    async getImageApi(type: string, prefix: string){
        try{
            const response = await api.post('/images', {
                type, prefix
            });
            return response;
        } catch (error) {
            const err = error as AxiosError
            return err.response;
        }
    }
}