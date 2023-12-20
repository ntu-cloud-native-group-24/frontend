import { FoodType } from "./FoodInterface";

export enum FilterType {
    ONSTOCK = "ONSTOCK",
    SOLDOUT = "SOLDOUT",
}

// HomePage, SearchPage show Stores
export interface StoreType {
    id: number;
    name: string;
    email: string;
    address: string;
    description: string;
    phone: string;
    picture_url: string;
    status: boolean;
    tags: TagType[];
    categories: CategoryType[];
    hours: HoursType[];
}

export interface TagType {
    id: number;
    name: string;
}

export interface CategoryType {
    id: number;
    name: string;
}

export interface HoursType {
    id: number;
    day: number;
    open_time: string;
    close_time: string;
}

export interface StoreProps {
    store: StoreType;
    foods: FoodType[];
}

export interface StoreContentProps {
    foods: FoodType[];
    isInFilter: boolean;
    categoriesList: string[];
    store: StoreType;
}

// export const dummyStore: StoreType = {
//     name: "ML Pasta",
//     picture_url:
//         "https://png.pngtree.com/back_origin_pic/05/05/68/52e6ab3fde77ad0a01b5d03c03e982f8.jpg",
//     open_time: new Date("08:00 AM"),
//     close_time: new Date("08:00 PM"),
//     status: true,
//     day: 27,
// };

// export const dummyData: FoodType[] = [
//     {
//         key: 0,
//         name: "白飯",
//         price: 10,
//         status: true,
//         soldAmount: 100,
//         description: "就是白飯",
//         picture:
//             "https://thewanderlustkitchen.com/wp-content/uploads/2013/12/Perfect-White-Rice-Recipe-Redo-17-2.jpg",
//         tags: ["RECOMMEND", "RICE", "FOOD"],
//         singleSelections: [
//             {
//                 title: "飯量",
//                 selections: [
//                     { name: "飯大", price: 10, status: true },
//                     { name: "飯中", price: 0, status: true },
//                     { name: "飯小", price: -1, status: false },
//                 ],
//             },
//         ],
//         multipleSelections: [
//             {
//                 title: "加料",
//                 selections: [
//                     { name: "+ 滷肉", price: 30, status: true },
//                     { name: "+ 炒 ", price: 10, status: false },
//                     { name: "+ 辣椒", price: 20, status: true },
//                     { name: "+ 螃蟹", price: 100, status: false },
//                     { name: "+ 咖啡", price: 50, status: true },
//                 ],
//             },
//         ],
//     },
//     {
//         key: 1,
//         name: "牛肉麵",
//         price: 170,
//         status: true,
//         soldAmount: 20,
//         description: "牛肉 + 麵",
//         picture:
//             "https://www.thespruceeats.com/thmb/ABkIbUeYTsxUQZYiFdJTzIK_r9s=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/taiwanese-beef-noodle-soup-4777014-hero-01-e06a464badec476684e513cad44612da.jpg",
//         tags: ["RECOMMEND", "NOODLE", "FOOD"],
//         singleSelections: [],
//         multipleSelections: [],
//     },
//     {
//         key: 2,
//         name: "炸雞",
//         price: 207,
//         status: true,
//         soldAmount: 1000,
//         description: "炸雞就是炸雞還要問",
//         picture:
//             "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2019/2/19/1/FN_Air-Fryer-Chicken-Wings-H_s4x3.jpg.rend.hgtvcom.1280.1280.suffix/1550611553388.jpeg",
//         tags: ["WINGS", "FOOD"],
//         singleSelections: [],
//         multipleSelections: [],
//     },
//     {
//         key: 3,
//         name: "起司披薩",
//         price: 200,
//         status: true,
//         soldAmount: 230,
//         description: "ITALIAN PIZZA YEAH",
//         picture:
//             "https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
//         tags: ["RECOMMEND", "PIZZA", "FOOD"],
//         singleSelections: [],
//         multipleSelections: [],
//     },
//     {
//         key: 4,
//         name: "炒飯",
//         price: 160,
//         status: true,
//         soldAmount: 20,
//         description: "隔夜飯 + 炒 = 炒飯",
//         picture:
//             "https://www.allrecipes.com/thmb/G96Vc_7F5Dm0csJJb2STC6tO97k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/79543-fried-rice-restaurant-style-mfs-49-79b33da67e2643e8b585972cd92c5821.jpg",
//         tags: ["RICE", "FOOD"],
//         singleSelections: [],
//         multipleSelections: [],
//     },
//     {
//         key: 5,
//         name: "拿鐵",
//         price: 80,
//         status: true,
//         soldAmount: 900,
//         description: "咖啡牛奶版",
//         picture:
//             "https://neurosciencenews.com/files/2023/06/coffee-brain-caffeine-neuroscincces.jpg",
//         tags: ["DRINK", "COFFEE"],
//         singleSelections: [],
//         multipleSelections: [],
//     },
//     {
//         key: 6,
//         name: "紅茶",
//         price: 50,
//         status: true,
//         soldAmount: 600,
//         description: "BLACK TEA YOUR BEST CHOICE",
//         picture:
//             "https://images.chinatimes.com/newsphoto/2019-01-21/656/20190121001620.png",
//         tags: ["DRINK"],
//         singleSelections: [],
//         multipleSelections: [],
//     },
//     {
//         key: 7,
//         name: "臘腸披薩",
//         price: 199,
//         status: true,
//         soldAmount: 99,
//         description: "披薩的升級版",
//         picture:
//             "https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2021/06/1200/675/iStock-1222455274.jpg?ve=1&tl=1",
//         tags: ["PIZZA", "FOOD"],
//         singleSelections: [],
//         multipleSelections: [],
//     },
//     {
//         key: 8,
//         name: "夏威夷披薩",
//         price: 170,
//         status: true,
//         soldAmount: 87,
//         description: "在夏威夷的披薩",
//         picture: "",
//         tags: ["PIZZA", "FOOD"],
//         singleSelections: [],
//         multipleSelections: [],
//     },
//     {
//         key: 9,
//         name: "米糕",
//         price: 87,
//         status: true,
//         soldAmount: 580,
//         description: "糯米雞的朋友",
//         picture:
//             "https://tokyo-kitchen.icook.network/uploads/step/cover/915480/5a9b0a387754fd7a.jpg",
//         tags: ["RICE", "FOOD"],
//         singleSelections: [],
//         multipleSelections: [],
//     },
//     {
//         key: 10,
//         name: "提拉米蘇",
//         price: 127,
//         status: true,
//         soldAmount: 70,
//         description: "蛋糕，超好吃der",
//         picture: "",
//         tags: ["RECOMMEND", "DESSERT", "FOOD"],
//         singleSelections: [],
//         multipleSelections: [],
//     },
//     {
//         key: 11,
//         name: "沙拉",
//         price: 5,
//         status: false,
//         soldAmount: 10,
//         description: "超難吃的東西",
//         picture:
//             "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_center,w_730,h_487/k%2Farchive%2F3a159785f764bff9cd80202b094f9b7a65da99e7",
//         tags: ["DESSERT", "FOOD"],
//         singleSelections: [],
//         multipleSelections: [],
//     },
// ];
