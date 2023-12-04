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

export interface OrderProps {
    order: OrderType;
}

export const dummyOrder: OrderType[] = [
    {
        id: 1,
        timestamp: new Date('2023-09-01 08:30 AM'),
        user: {
            name: 'Ruby',
            picture_url: '',   
        },
        notes: 'asdf',
        payment_type: PaymentType.CASH,
        delivery_method: DeliveryMethod.PICKUP,
        order_state: OrderState.PAID,
        order_status: OrderStatus.PENDING,
        foods: [
            {
                key: 0,
                name: '白飯',
                price: 10,
                status: true,
                soldAmount: 100,
                description: '就是白飯',
                picture: 'https://thewanderlustkitchen.com/wp-content/uploads/2013/12/Perfect-White-Rice-Recipe-Redo-17-2.jpg',
                tags: [
                    'RECOMMEND',
                    'RICE',
                    'FOOD',
                ],
                singleSelections: [{
                    'title': '飯量',
                    selections: [{ name: '飯大', price: 10, status: true }]
                }],
                multipleSelections: [{
                    'title': '加料',
                    selections: [{ name: '+ 炒', price: 10, status: true  },
                    { name: '+ 咖啡', price: 50, status: true  },]
                }]
            },
            {
                key: 1,
                name: '牛肉麵',
                price: 170,
                status: true,
                soldAmount: 20,
                description: '牛肉 + 麵',
                picture: 'https://www.thespruceeats.com/thmb/ABkIbUeYTsxUQZYiFdJTzIK_r9s=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/taiwanese-beef-noodle-soup-4777014-hero-01-e06a464badec476684e513cad44612da.jpg',
                tags: [
                    'RECOMMEND',
                    'NOODLE',
                    'FOOD',
                ],
                singleSelections: [],
                multipleSelections: [],
            }
        ]
    },
    {
        id: 2,
        timestamp: new Date('2023-09-01 08:32 AM'),
        user: {
            name: 'Ruffy',
            picture_url: '',   
        },
        notes: 'HI HIH IH IAHSIODFHAIOSDFHIOASDHFIOAHSODIFNASODIFNAOISDFNOIASNDFOIASNDF',
        payment_type: PaymentType.CREDIT_CARD,
        delivery_method: DeliveryMethod.PICKUP,
        order_state: OrderState.PAID,
        order_status: OrderStatus.PENDING,
        foods: [
            {
                key: 0,
                name: '白飯',
                price: 10,
                status: true,
                soldAmount: 100,
                description: '就是白飯',
                picture: 'https://thewanderlustkitchen.com/wp-content/uploads/2013/12/Perfect-White-Rice-Recipe-Redo-17-2.jpg',
                tags: [
                    'RECOMMEND',
                    'RICE',
                    'FOOD',
                ],
                singleSelections: [{
                    'title': '飯量',
                    selections: [{ name: '飯小', price: -1, status: true }]
                }],
                multipleSelections: [{
                    'title': '加料',
                    selections: [{ name: '+ 咖啡', price: 50, status: true  },]
                }]
            },
            {
                key: 1,
                name: '牛肉麵',
                price: 170,
                status: true,
                soldAmount: 20,
                description: '牛肉 + 麵',
                picture: 'https://www.thespruceeats.com/thmb/ABkIbUeYTsxUQZYiFdJTzIK_r9s=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/taiwanese-beef-noodle-soup-4777014-hero-01-e06a464badec476684e513cad44612da.jpg',
                tags: [
                    'RECOMMEND',
                    'NOODLE',
                    'FOOD',
                ],
                singleSelections: [],
                multipleSelections: [],
            },
            {
                key: 2,
                name: '炸雞',
                price: 207,
                status: true,
                soldAmount: 1000,
                description: '炸雞就是炸雞還要問',
                picture: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2019/2/19/1/FN_Air-Fryer-Chicken-Wings-H_s4x3.jpg.rend.hgtvcom.1280.1280.suffix/1550611553388.jpeg',
                tags: [
                    'WINGS',
                    'FOOD',
                ],
                singleSelections: [],
                multipleSelections: [],
            },
        ]
    }
]