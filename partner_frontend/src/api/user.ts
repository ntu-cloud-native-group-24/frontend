import api from './axiosClient';
import type { AxiosError } from 'axios';

export const userApi = {
    async register(name: string, username: string, password: string, email: string) {
        try{
            const response = await api.post('/register?privilege=store_manager', {
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
    async testHealth(){
        try{
            const response = await api.get('/health/check')
            return response;
        } catch (error) {
            const err = error as AxiosError
            return err.response;
        }
    }
}