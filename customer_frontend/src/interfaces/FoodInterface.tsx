import { FilterType, HoursType, StoreType } from "./StoreInterface";

// Store Meal display
export interface FoodType {
    id: number;
    name: string;
    description: string | null; // string
    price: number; // money $
    picture: string; // url
    is_available: boolean; // onStock or soldOut
    customizations: FoodSelectionGroups;
    categories: string[];
}

export interface FoodDisplayProps {
    food: FoodType;
    store: StoreType;
}

export interface FoodSelectionType {
    name: string;
    price: number;
    selected: boolean;
    enabled: boolean;
}

export interface FoodSelectionGroupType {
    type: string;
    title: string;
    items: Array<FoodSelectionType>;
}

export interface FoodSelectionGroups {
    selectionGroups: Array<FoodSelectionGroupType>;
}

// filter Store Meal
export interface FoodFilterProps {
    collapsed: boolean;
    // sortValue: SortType;
    priceRange: number[];
    filterArray: FilterType[];
    filterCategories: string[];
    fullCategoriesList: string[];
    foodMaxPrice: number;
    initStoreStatus: boolean;
    initStoreTimes: HoursType[];

    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
    // setSortValue: React.Dispatch<React.SetStateAction<SortType>>;
    setPriceRange: React.Dispatch<React.SetStateAction<number[]>>;
    setFilterArray: React.Dispatch<React.SetStateAction<FilterType[]>>;
    setFilterCategories: React.Dispatch<React.SetStateAction<string[]>>;
    clearFilter: () => void;
}

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

export const fallbackSRC =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg==";
