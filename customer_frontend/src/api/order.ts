import api from "./axiosClient";
import type { AxiosError } from "axios";
import { OrderState } from "../interfaces/OrderInterface";

export const orderApi = {
    async getUserOrders() {
        try {
            const response = await api.get("/me/orders");
            return response;
        } catch (error) {
            const err = error as AxiosError;
            return err.response;
        }
    },
    async getUserOrder(order_id: number) {
        try {
            const response = await api.get(`/orders/${order_id}`);
            return response;
        } catch (error) {
            const err = error as AxiosError;
            return err.response;
        }
    },
    async createUserOrder(order: any) {
        try {
            const response = await api.post("/orders", { ...order });
            return response;
        } catch (error) {
            const err = error as AxiosError;
            return err.response;
        }
    },
    async cancelUserOrder(order_id: number, state: string) {
        try {
            const response = await api.patch(`/orders/${order_id}`, { state });
            return response;
        } catch (error) {
            const err = error as AxiosError;
            return err.response;
        }
    },
};
