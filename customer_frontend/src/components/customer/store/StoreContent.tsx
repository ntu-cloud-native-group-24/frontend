import { useMemo } from "react";
import { StoreContentProps } from "../../../interfaces/StoreInterface";
import { Flex, Typography } from "antd";
import FoodDisplay from "./FoodDisplay";

const StoreContent = ({ foods, isInFilter, tagsList }: StoreContentProps) => {
    // foodList = [{ tag: string; foods: Array<FoodType>; }]
    const foodList = useMemo(() => {
        const myTagsList = tagsList.sort();
        const RECOMMEND_INDEX = myTagsList.findIndex(
            (tag) => tag.toUpperCase() === "RECOMMEND"
        );
        if (RECOMMEND_INDEX !== -1) {
            //SWAP WITH Recommend
            const temp = myTagsList[RECOMMEND_INDEX];
            myTagsList[RECOMMEND_INDEX] = myTagsList[0];
            myTagsList[0] = temp;
        }
        return myTagsList.map((tag) => {
            return {
                tag: tag,
                foods: foods.filter(
                    (food) => food.tags.findIndex((ftag) => ftag === tag) !== -1
                ),
            };
        });
    }, [tagsList, foods]);

    const NormalDisplay = () => {
        return (
            <Flex vertical className="pt-4 w-full" gap="large">
                {foodList.map((item, i) =>
                    item.foods.length > 0 ? (
                        <Flex key={i} vertical gap="large">
                            <Typography.Text className="font-bold text-xl">
                                {item.tag.toUpperCase()}
                            </Typography.Text>
                            <Flex
                                key={"space" + i}
                                wrap="wrap"
                                className="grid 2xl:grid-cols-6 xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2"
                                gap="small"
                            >
                                {item.foods.map((food) => (
                                    <FoodDisplay key={food.key} food={food} />
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
                        <FoodDisplay key={food.key} food={food} />
                    ))}
                </Flex>
            </Flex>
        );
    };

    return !isInFilter ? <NormalDisplay /> : <FilterDisplay />;
};

export default StoreContent;
