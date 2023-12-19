import { useState, useEffect } from "react";
import PCStoreSubPage from "./__subpage/PCStoreSubPage";

import { useLocation } from "react-router-dom";
import { storeApi } from "../../../api/store";

import { FoodType } from "../../../interfaces/FoodInterface";
import { CategoryType, StoreType } from "../../../interfaces/StoreInterface";

const StorePage = () => {
    const location = useLocation();

    const pathnameSplited = location.pathname.split("/");
    const store_id = pathnameSplited[pathnameSplited.length - 1];

    const [foods, setFoods] = useState<FoodType[]>([]);
    const [store, setStore] = useState<StoreType>();

    useEffect(() => {
        const getAllMeals = async () => {
            // get store from store_id
            const storeRes = await storeApi.getStore(Number(store_id));
            console.log(storeRes?.data);
            if (!storeRes || storeRes.status !== 200) {
                return;
            } else {
                setStore(storeRes?.data.store);
            }

            // get meals from store
            const foodsRes = await storeApi.getStoreMeals(store_id);
            console.log(foodsRes?.data);
            if (!foodsRes || foodsRes.status !== 200) {
                return;
            } else {
                const tmpFoods = [];
                for (let i = 0; i < foodsRes?.data.meals.length; i++) {
                    const foodCategoriesRes =
                        await storeApi.getStoreMealCategories(
                            store_id,
                            foodsRes?.data.meals[i].id
                        );

                    console.log(foodCategoriesRes?.data);
                    if (
                        !foodCategoriesRes ||
                        foodCategoriesRes.status !== 200
                    ) {
                        return;
                    } else {
                        const tmpFood = {
                            ...foodsRes?.data.meals[i],
                            categories: foodCategoriesRes?.data.categories.map(
                                (category: CategoryType) => {
                                    return category.name;
                                }
                            ),
                        };
                        tmpFoods.push(tmpFood);
                    }
                }
                setFoods(tmpFoods);
                console.log("tmpFoods", tmpFoods);
            }
        };
        getAllMeals();
        // setStore(dummyStore);
        // setFoods(dummyData);
        // console.log(height);
    }, [store_id]);

    return (
        <div>
            {store && foods.length ? (
                <PCStoreSubPage store={store} foods={foods} />
            ) : (
                <></>
            )}
            {/* {width > 844 ? <PCStoreSubPage store={store} foods={foods}  /> : <MobileStoreSubPage store={store} foods={foods} />} */}
        </div>
    );
};

export default StorePage;

// import { Flex, Layout, Typography } from "antd";

// import FoodDisplay from "../../../components/customer/store/FoodDisplay";

// const { Content } = Layout;

// const StorePage = () => {
//     // GET /api/store/:id

//     const dummyFood = {
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
//     };

//     return (
//         <Content className="bg-blue-300 max-h-full">
//             <Flex vertical gap={0}>
//                 <div className="w-full bg-cover bg-[url('/src/assets/background/bg_home.jpg')]">
//                     <Flex
//                         className="h-full w-full text-white pl-32 bg-black bg-opacity-50"
//                         align="center"
//                     >
//                         <Flex vertical className="py-10">
//                             <Typography.Title
//                                 style={{ color: "white", fontSize: 48 }}
//                             >
//                                 Search Store
//                             </Typography.Title>
//                         </Flex>
//                     </Flex>
//                 </div>
//                 <Flex
//                     className="grid md:grid-cols-6 grid-cols-1"
//                     wrap="wrap"
//                     gap={10}
//                 >
//                     <FoodDisplay food={dummyFood} />
//                     <FoodDisplay food={dummyFood} />
//                     <FoodDisplay food={dummyFood} />
//                     <FoodDisplay food={dummyFood} />
//                 </Flex>
//             </Flex>
//         </Content>
//     );
// };

// export default StorePage;
