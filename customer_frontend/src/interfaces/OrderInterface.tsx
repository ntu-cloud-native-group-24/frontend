// import { UserType } from "./UserInterface";
import { FoodSelectionGroups } from "./FoodInterface";

export enum PaymentType {
    CASH = "cash",
    CREDIT_CARD = "credit_card",
    MONTHLY = "monthly",
}

export enum DeliveryMethod {
    PICKUP = "pickup",
    DELIVERY = "delivery",
}

export enum OrderState {
    PENDING = "pending",
    PREPARING = "preparing",
    PREPARED = "prepared",
    COMPLETED = "completed",
    CANCELED = "cancelled",
}

export interface OrderType {
    id: number;
    user_id: number;
    store_id: number;
    notes: string;
    calculated_total_price: number;
    state: OrderState;
    payment_type: PaymentType;
    delivery_method: DeliveryMethod;
    created_at: Date;
}

export interface OrderDetailType {
    id: number;
    user_id: number;
    store_id: number;
    notes: string;
    calculated_total_price: number;
    state: OrderState;
    payment_type: PaymentType;
    delivery_method: DeliveryMethod;
    created_at: Date;
    details: OrderMealType[];
}

export interface OrderMealType {
    id: number;
    order_id: number;
    meal_id: number;
    quantity: number;
    notes: string;
    customizations: FoodSelectionGroups;
    calculated_price_per_item: number;
    picture: string;
    name: string;
    price: number;
}

// payment page create an order
export interface OrderSubmitType {
    store_id: number;
    notes: string;
    payment_type: PaymentType;
    delivery_method: DeliveryMethod;
    order: OrderMealSubmitType;
}

export interface OrderMealSubmitType {
    items: OrderMealItemSubmitType[];
}

export interface OrderMealItemSubmitType {
    meal_id: number;
    quantity: number;
    notes: string;
    customizations: FoodSelectionGroups;
}

export interface OrderMealDisplayProps {
    food: OrderMealType;
}

export interface OrdersProps {
    orders: OrderType[];
}

export interface OrderProps {
    order: OrderType;
    targetOrder: OrderType | undefined;
    setTargetOrder: React.Dispatch<React.SetStateAction<OrderType | undefined>>;
    orderState: OrderState;
}

export interface OrderMobileProps {
    order: OrderType;
    orderState: OrderState;
}

export interface OrderDetailProps {
    order: OrderType | undefined;
}

// export const dummyOrder: OrderType[] = [
//     {
//         id: 1,
//         timestamp: new Date("2023-09-01 08:30 AM"),
//         user: {
//             name: "Ruby",
//             picture_url: "",
//         },
//         notes: "asdf",
//         payment_type: PaymentType.CASH,
//         delivery_method: DeliveryMethod.PICKUP,
//         order_state: OrderState.PENDING,
//         foods: [
//             {
//                 key: 0,
//                 name: "白飯",
//                 price: 10,
//                 status: true,
//                 soldAmount: 100,
//                 description: "就是白飯",
//                 picture:
//                     "https://thewanderlustkitchen.com/wp-content/uploads/2013/12/Perfect-White-Rice-Recipe-Redo-17-2.jpg",
//                 tags: ["RECOMMEND", "RICE", "FOOD"],
//                 singleSelections: [
//                     {
//                         title: "飯量",
//                         selections: [{ name: "飯大", price: 10, status: true }],
//                     },
//                 ],
//                 multipleSelections: [
//                     {
//                         title: "加料",
//                         selections: [
//                             { name: "+ 炒", price: 10, status: true },
//                             { name: "+ 咖啡", price: 50, status: true },
//                         ],
//                     },
//                 ],
//             },
//             {
//                 key: 1,
//                 name: "牛肉麵",
//                 price: 170,
//                 status: true,
//                 soldAmount: 20,
//                 description: "牛肉 + 麵",
//                 picture:
//                     "https://www.thespruceeats.com/thmb/ABkIbUeYTsxUQZYiFdJTzIK_r9s=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/taiwanese-beef-noodle-soup-4777014-hero-01-e06a464badec476684e513cad44612da.jpg",
//                 tags: ["RECOMMEND", "NOODLE", "FOOD"],
//                 singleSelections: [],
//                 multipleSelections: [],
//             },
//         ],
//     },
//     {
//         id: 2,
//         timestamp: new Date("2023-09-01 08:32 AM"),
//         user: {
//             name: "Ruffy",
//             picture_url: "",
//         },
//         notes: "HI HIH IH IAHSIODFHAIOSDFHIOASDHFIOAHSODIFNASODIFNAOISDFNOIASNDFOIASNDF",
//         payment_type: PaymentType.CREDIT_CARD,
//         delivery_method: DeliveryMethod.PICKUP,
//         order_state: OrderState.CANCELED,
//         foods: [
//             {
//                 key: 0,
//                 name: "白飯",
//                 price: 10,
//                 status: true,
//                 soldAmount: 100,
//                 description: "就是白飯",
//                 picture:
//                     "https://thewanderlustkitchen.com/wp-content/uploads/2013/12/Perfect-White-Rice-Recipe-Redo-17-2.jpg",
//                 tags: ["RECOMMEND", "RICE", "FOOD"],
//                 singleSelections: [
//                     {
//                         title: "飯量",
//                         selections: [{ name: "飯小", price: -1, status: true }],
//                     },
//                 ],
//                 multipleSelections: [
//                     {
//                         title: "加料",
//                         selections: [
//                             { name: "+ 咖啡", price: 50, status: true },
//                         ],
//                     },
//                 ],
//             },
//             {
//                 key: 1,
//                 name: "牛肉麵",
//                 price: 170,
//                 status: true,
//                 soldAmount: 20,
//                 description: "牛肉 + 麵",
//                 picture:
//                     "https://www.thespruceeats.com/thmb/ABkIbUeYTsxUQZYiFdJTzIK_r9s=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/taiwanese-beef-noodle-soup-4777014-hero-01-e06a464badec476684e513cad44612da.jpg",
//                 tags: ["RECOMMEND", "NOODLE", "FOOD"],
//                 singleSelections: [],
//                 multipleSelections: [],
//             },
//             {
//                 key: 2,
//                 name: "炸雞",
//                 price: 207,
//                 status: true,
//                 soldAmount: 1000,
//                 description: "炸雞就是炸雞還要問",
//                 picture:
//                     "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2019/2/19/1/FN_Air-Fryer-Chicken-Wings-H_s4x3.jpg.rend.hgtvcom.1280.1280.suffix/1550611553388.jpeg",
//                 tags: ["WINGS", "FOOD"],
//                 singleSelections: [],
//                 multipleSelections: [],
//             },
//         ],
//     },
// ];
