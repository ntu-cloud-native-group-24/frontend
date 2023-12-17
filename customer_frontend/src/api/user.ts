import api from './axiosClient';
import type { AxiosError } from 'axios';

export const userApi = {
    async getCurrentUser(){
        try{
            const response = await api.get('/me')
            return response;
        } catch (error) {
            const err = error as AxiosError
            return err.response;
        }
    },
    async updateEmail(name: string, email: string){
        try{
            const response = await api.post('/me', {
                name, email
            })
            return response;
        } catch (error) {
            const err = error as AxiosError
            return err.response;
        }
    },
    async updatePassword(password: string, password_old:string){
        try{
            const response = await api.post('/me/password', {
                password, password_old
            })
            return response;
        } catch (error) {
            const err = error as AxiosError
            return err.response;
        }
    },
    async register(name: string, email: string, username: string, password: string,) {
        try{
            const response = await api.post('/register?privilege=consumer', {
                name, email, username, password
            })
            return response;
        } catch (error) {
            const err = error as AxiosError
            return err.response;
        }
    },
    async login(username: string, password: string){
        try{
            const response = await api.post('/login', {
                username, password
            })
            return response;
        } catch (error) {
            const err = error as AxiosError
            return err.response;
        }
    },
    async healthCheck(){
        try{
            const response = await api.get('/health/check')
            return response;
        } catch (error) {
            const err = error as AxiosError
            return err.response;
        }
    }
}