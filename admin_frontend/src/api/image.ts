import api from "./axiosClient";
import { AxiosError } from "axios";

export const imageApi = {
    async getImageApi(type: string, prefix: string){
        try{
            const response = await api.post('/images', {
                type, prefix
            })
            return{
                status: response.status,
                data: response.data
            }
        } catch (err){
            const error = err as AxiosError
            return{
                status: error.response?.status,
                data: error.response?.data
            }
        }
    }
}