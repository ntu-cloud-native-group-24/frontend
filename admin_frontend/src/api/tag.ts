import api from "./axiosClient";
import { AxiosError } from "axios";

export const tagApi = {
    async getAllTags(){
        try{
            const response = await api.get('/tags');
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
    async getStoreTags(storeId: number){
        try{
            const response = await api.get(`/store/${storeId}/tags`);
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
    async addStoreTags(storeId: number, tag_id: number){
        try{
            const response = await api.post(`/store/${storeId}/tags`, {tag_id});
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
    async removeStoreTags(storeId: number, tag_id: number){
        try{
            const response = await api.delete(`/store/${storeId}/tags/${tag_id}`);
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
};