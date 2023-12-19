import api from "./axiosClient";
import { AxiosError } from "axios";

export const categoryApi = {
    async getAllCategory(storeId: number){
        try{
            const response = await api.get(`/store/${storeId}/category`);
            return {
                data: response.data,
                status: response.status
            }
        } catch (err){
            const error = err as AxiosError;
            return {
                data: error.response?.data,
                status: error.response?.status
            }
        }
    },
    async getCategoryByMealId(storeId: number, mealId: number){
        try{
            const repsonse = await api.get(`/store/${storeId}/meals/${mealId}/categories`);
            return {
                data: repsonse.data,
                status: repsonse.status
            }
        } catch (err) {
            const error = err as AxiosError;
            return {
                data: error.response?.data,
                status: error.response?.status
            }
        }
    },
    async createNewCategory(storeId: number, name: string){
        try{
            const response = await api.post(`/store/${storeId}/category`, {
                name: name.toUpperCase()
            });
            return {
                data: response.data,
                status: response.status
            }
        } catch (err){
            const error = err as AxiosError;
            return {
                data: error.response?.data,
                status: error.response?.status
            }
        }
    },
}