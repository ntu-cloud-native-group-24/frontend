import { FoodType } from "./FoodInterface";
import { StoreType } from "./StoreInterface";

export interface CartOrderType {
    store: StoreType;
    meals: CartMealType[];
}

export interface CartMealType {
    meal: FoodType;
    quantity: number;
    notes: string;
    customization_statuses: boolean[];
}
