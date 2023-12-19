import api from "./axiosClient";
import type { AxiosError } from "axios";

export const storeApi = {
    async getAllStores(){
        try{
            const response = await api.get('/store')
            return response;
        } catch (error) {
            const err = error as AxiosError
            return err.response;
        }
    },
    async getStore(id: number){
        try{
            const response = await api.get(`/store/${id}`)
            return response;

        } catch (error) {
            const err = error as AxiosError
            return err.response;
        }
    },
    async getStoreHours(id:number){
        try{
            const response = await api.get(`/store/${id}/hours`)
            return response;
        } catch (error) {
            const err = error as AxiosError
            return err.response;
        }
    },
    async getStoreMeals(store_id: string){
        try{
            const response = await api.get(`/store/${store_id}/meals`)
            return response;
        } catch (error) {
            const err = error as AxiosError
            return err.response;
        }
    },
    async getStoreMeal(store_id: string, meal_id:string){
        try{
            const response = await api.get(`/store/${store_id}/meals/${meal_id}`)
            return response;
        } catch (error) {
            const err = error as AxiosError
            return err.response;
        }
    },
    async getStoreMealCategories(store_id: string, meal_id:string){
        try{
            const response = await api.get(`/store/${store_id}/meals/${meal_id}/categories`)
            return response;
        } catch (error) {
            const err = error as AxiosError
            return err.response;
        }
    },
    // Meal tags related
    async getStoreTags(id: number){
        try{
            const response = await api.get(`/store/${id}/tags`)
            return response;
        } catch (error) {
            const err = error as AxiosError
            return err.response;
        }
    },
    // store meal categories related
    async getStoreCategories(store_id: string){
        try{
            const response = await api.get(`/store/${store_id}/category`)
            return response;
        } catch (error) {
            const err = error as AxiosError
            return err.response;
        }
    },
    async getStoreCategoryInfo(store_id:string, category_id: string){
        try{
            const response = await api.get(`/store/${store_id}/category/${category_id}`)
            return response;
        } catch (error) {
            const err = error as AxiosError
            return err.response;
        }
    }

}