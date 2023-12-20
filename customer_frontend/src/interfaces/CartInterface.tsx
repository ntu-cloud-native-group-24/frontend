import { FoodType } from "./FoodInterface";
import { StoreType } from "./StoreInterface";

// CartPage, save Cart items in localStorage
// PaymentPage, get Cart items data
export interface CartOrderType {
    store: StoreType;
    meals: CartMealType[];
    totalPrice: number;
}

export interface CartMealType {
    meal: FoodType;
    quantity: number;
    notes: string;
    customization_statuses: boolean[];
    customization: OptionType[];
}

export interface OptionType {
    name: string;
    value: number;
}

export interface CartMealDataType {
    key: string;
    image: string;
    name: string;
    customization: OptionType[];
    note: string;
    price: number;
    quantity: CartMealType;
    total: number;
    act: CartMealType;
}
