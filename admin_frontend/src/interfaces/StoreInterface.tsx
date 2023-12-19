import { FoodCategory, FoodType } from "./FoodInterface";
import { OrderType } from "./OrderInterface";

export enum SortType {
    NONE,
    RATING,
    POPULAR,
}

export enum FilterType {
    SOLDOUT,
    ONSTOCK,
}

export interface StoreType {
    id: number;
    name: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    picture_url: string;
    status: boolean;
}

export interface HourType {
    id: number;
    day: number;
    open_time: string;
    close_time: string;
}

export interface RestaurantProps {
    store: StoreType;
    foods: FoodType[];
    fetchFoods: () => Promise<void>;
}

export interface RestaurantContentProps {
    foods: FoodType[];
    isInFilter: boolean;
    tagsList: FoodCategory[];
    fetchMeals: () => Promise<void>;
}

export interface OrderResultType {
    month: string;
    orders: OrderType[];
}