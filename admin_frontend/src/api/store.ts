import { AxiosError } from "axios";
import api from "./axiosClient";

export const storeApi = {
    async getMyStores(){
        try{
            const response = await api.get('/me/stores');
            return {
                status: response.status,
                data: response.data,
            }
        } catch (err){
            const error = err as AxiosError
            return {
                status: error.response?.status,
                data: error.response?.data
            }
        }
    },
    async getStoreById(storeId: number){
        try{
            const response = await api.get(`/store/${storeId}`);
            return {
                status: response.status,
                data: response.data,
            }
        } catch (err){
            const error = err as AxiosError
            return {
                status: error.response?.status,
                data: error.response?.data
            }
        }
    },
    async getAllMeal(storeId: number){
        try{
            const response = await api.get(`/store/${storeId}/meals`);
            return {
                status: response.status,
                data: response.data,
            }
        } catch (err){
            const error = err as AxiosError
            return {
                status: error.response?.status,
                data: error.response?.data
            }
        }
    },
    async getStoreTimeById(storeId: number){
        try{
            const response = await api.get(`/store/${storeId}/hours`);
            return {
                status: response.status,
                data: response.data,
            }
        } catch (err){
            const error = err as AxiosError
            return {
                status: error.response?.status,
                data: error.response?.data
            }
        }
    },
    async createStoreTime(storeId: number, day: number, open_time: string, close_time: string){
        try{
            const response = await api.post(`/store/${storeId}/hours`, {
                day, open_time, close_time
            });
            return {
                status: response.status,
                data: response.data,
            }
        } catch (err){
            const error = err as AxiosError
            return {
                status: error.response?.status,
                data: error.response?.data
            }
        }
    },
    async updateStoreData(storeId: number, name: string, description: string, address: string, picture_url: string, status: boolean, phone: string, email: string){
        try{
            const response = await api.put(`/store/${storeId}`, {
                name, description, address, picture_url, status, phone, email
            });
            return {
                status: response.status,
                data: response.data,
            }
        } catch (err) {
            const error = err as AxiosError
            return {
                status: error.response?.status,
                data: error.response?.data
            }
        }
    },
    async deleteStoreTime(storeId: number, hour_id: number){
        try{
            const response = await api.delete(`/store/${storeId}/hours/${hour_id}`);
            return {
                status: response.status,
                data: response.data,
            }
        } catch (err) {
            const error = err as AxiosError
            return {
                status: error.response?.status,
                data: error.response?.data
            }
        }
    },
    async getMonthRevenue(storeId: number){
        try{
            const response = await api.get(`/store/${storeId}/orders/monthly`);
            return {
                status: response.status,
                data: response.data,
            }
        } catch (err) {
            const error = err as AxiosError
            return {
                status: error.response?.status,
                data: error.response?.data
            }
        }
    }
}