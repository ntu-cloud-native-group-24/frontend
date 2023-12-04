import { FoodType } from "./FoodInterface";
import { UserType } from "./UserInterface";


export enum PaymentType {
    CASH,
    CREDIT_CARD,
    MONTHLY,
}

export enum DeliveryMethod {
    PICKUP,
    DELIVER,
}

export enum OrderState {
    UNPAID,
    PAID,
    ABORT,
}

export enum OrderStatus {
    PENDING,
    PREPARED,
    DONE,
}

export interface OrderType {
    id: number;
    timestamp: Date;
    user: UserType;
    notes: string;
    payment_type: PaymentType;
    delivery_method: DeliveryMethod;
    order_state: OrderState;
    order_status: OrderStatus;
    foods: FoodType[];
}