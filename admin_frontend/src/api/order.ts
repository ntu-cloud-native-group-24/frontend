import api from "./axiosClient";
import { AxiosError } from "axios";

export const orderApi = {
    async getAllOrder(storeId: number){
        try{
            const response = await api.get(`/store/${storeId}/orders`);
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
    async getOrderDetail(orderId: number){
        try{
            const response = await api.get(`/orders/${orderId}`);
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
    async acceptOrder(orderId: number){
        try{
            const response = await api.patch(`/orders/${orderId}`, {
                state: "preparing"
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
    async rejectOrder(orderId: number){
        try{
            const response = await api.patch(`/orders/${orderId}`, {
                state: "cancelled"
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
    async preparedOrder(orderId: number){
        try{
            const response = await api.patch(`/orders/${orderId}`, {
                state: "prepared"
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
    async completeOrder(orderId: number){
        try{
            const response = await api.patch(`/orders/${orderId}`, {
                state: "completed"
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
    }
}