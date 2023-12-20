import { MessageInstance } from "antd/es/message/interface";

export enum PaymentType {
    CASH = 'cash',
    CREDIT_CARD = 'credit_card',
    MONTHLY = 'monthly',
}

export enum DeliveryMethod {
    PICKUP = 'pickup',
    DELIVER = 'delivery',
}


export enum OrderStatus {
    UNPAID = 'unpaid',
    PAID = 'paid',
    ABORT = 'abort',
}

export enum OrderState {
    PENDING = 'pending',
    PREPARING = 'preparing',
    PREPARED = 'prepared',
    CANCELLED = 'cancelled',
    COMPLETE = 'completed',
}

export interface OrderType {
    id: number;
    user_id: number;
    store_id: number;
    notes: string;
    payment_type: string;
    delivery_method: string;
    state: string;
    created_at: string;
    calculated_total_price: number;
}

export interface OrderSelectionItem {
    name: string
    price: number
    selected: boolean
}

export interface OrderRadioSelectionGroup {
    type: 'radio'
    title: string
    items: OrderSelectionItem[]
}

export interface OrderCheckboxSelectionGroup {
    type: 'checkbox'
    title: string
    items: OrderSelectionItem[]
}

export type OrderCustomizations = {
    selectionGroups: (OrderRadioSelectionGroup | OrderCheckboxSelectionGroup)[]
}

export interface OrderDetailType {
    id: number;
    order_id: number;
    meal_id: number;
    quantity: number;
    notes: string;
    customizations: OrderCustomizations;
    calculated_price_per_item: number;
}

/*
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
*/

export interface OrderProps {
    order: OrderType;
    fetchOrders: () => Promise<void>
}

export interface OrderDetailProps {
    order: OrderType | undefined;
    fetchOrders: () => Promise<void>
    setTargetOrder: React.Dispatch<React.SetStateAction<OrderType | undefined>>;
    messageApi: MessageInstance;
}

export interface OrderCProps {
    order: OrderType;
    targetOrder: OrderType | undefined;
    setTargetOrder: React.Dispatch<React.SetStateAction<OrderType | undefined>>;
}

export const dummyOrder: OrderType[] = [];