import axios from "axios";
import type { LoginType, SignUpType } from "../interfaces/ApiInterface";

const userRequest = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// consumer User APIs
export const apiLogin = (data: LoginType) => userRequest.post("/login", data);

export const apiRegister = (data: SignUpType) =>
    userRequest.post("/register?privilege=consumer", data);

export const apiMe = (token: string) =>
    userRequest.get("/me", {
        headers: {
            "X-API-KEY": token,
        },
    });

// consumer Store APIs

// get all stores
export const apiStore = () => userRequest.get("/store");

// get store by id
export const apiStoreDetail = (id: number) => userRequest.get(`/store/${id}`);

// get store opening hours
export const apiStoreHours = (id: number) =>
    userRequest.get(`/store/${id}/hours`);

// get store tags
export const apiStoreTags = (id: number) =>
    userRequest.get(`/store/${id}/tags`);

// get all store meals
export const apiStoreMeals = (store_id: string) =>
    userRequest.get(`/store/${store_id}/meals`);

// get meal
export const apiStoreMealsDetail = (store_id: string, meal_id: string) =>
    userRequest.get(`/store/${store_id}/meals/${meal_id}`);

// get categories of meal
export const apiStoreMealsCategories = (store_id: string, meal_id: string) =>
    userRequest.get(`/store/${store_id}/meals/${meal_id}/categories`);

// get store categories
export const apiStoreCategory = (store_id: string) =>
    userRequest.get(`/store/${store_id}/category`);

// get name of category
export const apiStoreCategoryDetail = (store_id: string, category_id: string) =>
    userRequest.get(`/store/${store_id}/category/${category_id}`);
