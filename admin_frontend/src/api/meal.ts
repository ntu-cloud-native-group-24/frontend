import api from "./axiosClient";
import { AxiosError } from "axios";
import { Customizations } from "../interfaces/FoodInterface";

export const mealApi = {
    async getMealById(storeId: number, mealId: number){
        try{
            const response = await api.get(`/store/${storeId}/meals/${mealId}`);
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
    async createMeal(storeId: number, name: string, description: string, price: number, picture: string, is_available: boolean, customizations: Customizations){
        try{
            const response = await api.post(`/store/${storeId}/meals`, {
                name: name,
                description: description,
                price: price,
                picture: picture,
                is_available: is_available,
                customizations: customizations
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
    async addCategoryToMeal(storeId: number, mealId: number, category_id: number){
        try{
            const response = await api.post(`/store/${storeId}/meals/${mealId}/categories`, {
                category_id: category_id
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
    async deleteCategoryFromMeal(storeId: number, mealId: number, category_id: number){
        try{
            const response = await api.delete(`/store/${storeId}/meals/${mealId}/categories/${category_id}`);
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
    async updateMeal(storeId: number, mealId: number, name: string, description: string, price: number, picture: string, is_available: boolean, customizations: Customizations){
        try{
            const response = await api.put(`/store/${storeId}/meals/${mealId}`, {
                id: mealId,
                name: name,
                description: description,
                price: price,
                picture: picture,
                is_available: is_available,
                customizations: customizations
            });
            return {
                data: response.data,
                status: response.status
            }
        } catch (err) {
            const error = err as AxiosError;
            return {
                data: error.response?.data,
                status: error.response?.status
            }
        }
    },
    async deleteMeal(storeId: number, mealId: number){
        try{
            const response = await api.delete(`/store/${storeId}/meals/${mealId}`);
            return {
                data: response.data,
                status: response.status
            }
        } catch (err) {
            const error = err as AxiosError;
            return {
                data: error.response?.data,
                status: error.response?.status
            }
        }
    }
}