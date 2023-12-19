import { useMemo } from "react";
import { StoreContentProps } from "../../../interfaces/StoreInterface";
import { Flex, Typography } from "antd";
import FoodDisplay from "./FoodDisplay";

const StoreContent = ({
    foods,
    isInFilter,
    categoriesList,
    store,
}: StoreContentProps) => {
    // foodList = [{ category: {id; string, name: string}; foods: Array<FoodType>; }]
    const foodList = useMemo(() => {
        const myCategoriesList = categoriesList.sort();
        const RECOMMEND_INDEX = myCategoriesList.findIndex(
            (category) => category.toUpperCase() === "RECOMMEND"
        );
        if (RECOMMEND_INDEX !== -1) {
            //SWAP WITH Recommend
            const temp = myCategoriesList[RECOMMEND_INDEX];
            myCategoriesList[RECOMMEND_INDEX] = myCategoriesList[0];
            myCategoriesList[0] = temp;
        }
        return myCategoriesList.map((category) => {
            return {
                category: category,
                foods: foods.filter(
                    (food) =>
                        food.categories.findIndex(
                            (fcategory) => fcategory === category
                        ) !== -1
                ),
            };
        });
    }, [categoriesList, foods]);

    const NormalDisplay = () => {
        return (
            <Flex vertical className="pt-4 w-full" gap="large">
                {foodList.map((item, i) =>
                    item.foods.length > 0 ? (
                        <Flex key={i} vertical gap="large">
                            <Typography.Text className="font-bold text-xl">
                                {item.category.toUpperCase()}
                            </Typography.Text>
                            <Flex
                                key={"space" + i}
                                wrap="wrap"
                                className="grid 2xl:grid-cols-6 xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2"
                                gap="small"
                            >
                                {item.foods.map((food) => (
                                    <FoodDisplay
                                        key={food.id}
                                        food={food}
                                        store={store}
                                    />
                                ))}
                            </Flex>
                        </Flex>
                    ) : (
                        <></>
                    )
                )}
            </Flex>
        );
    };

    const FilterDisplay = () => {
        return (
            <Flex vertical className="pt-4 w-full" gap="large">
                <Typography.Text className="font-bold text-xl">
                    Filter Results
                </Typography.Text>
                <Flex
                    wrap="wrap"
                    className="grid 2xl:grid-cols-6 xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2"
                    gap="small"
                >
                    {foods.map((food) => (
                        <FoodDisplay
                            key={food.id}
                            food={food}
                            store={store}
                        />
                    ))}
                </Flex>
            </Flex>
        );
    };

    return !isInFilter ? <NormalDisplay /> : <FilterDisplay />;
};

export default StoreContent;
