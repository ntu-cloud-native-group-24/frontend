import { AxiosError } from "axios";
import api from "./axiosClient";

export const userApi = {
    async testHealth(){
        try{
            const response = await api.get('/health/check');
            return response;
        } catch (error){
            const err = error as AxiosError;
            return err.response;
        }
    },
    async login( username: string, password: string ){
        try{
            const response = await api.post('/login', {
                username, password
            });
            return {
                status: response.status,
                data: response.data,
            }
        } catch (error) {
            const err = error as AxiosError;
            return {
                status: err.response?.status,
                data: err.response?.data,
            }
        }
    },
    async getCurrentUser(){
        try{
            const response = await api.get('/me');
            return {
                status: response.status,
                data: response.data,
            }
        } catch (error) {
            const err = error as AxiosError;
            return {
                status: err.response?.status,
                data: err.response?.data,
            }
        }
    },
    async updateUser(name: string, email: string){
        try{
            const response = await api.post('/me', {
                name, email
            });
            return {
                status: response.status,
                data: response.data,
            }
        } catch (error){
            const err = error as AxiosError;
            return {
                status: err.response?.status,
                data: err.response?.data,
            }
        }
    },
    async updatePassword(password: string, newPassword: string){
        try{
            const response = await api.post('/me/password', {
                password: newPassword,
                password_old: password
            });
            return {
                status: response.status,
                data: response.data,
            }
        } catch (error){
            const err = error as AxiosError;
            return {
                status: err.response?.status,
                data: err.response?.data,
            }
        }
    }
}