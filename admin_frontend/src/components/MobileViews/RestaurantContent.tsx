import { RestaurantContentProps } from "../../interfaces/StoreInterface";
import { useMemo } from 'react';
import FoodDisplay from "./FoodDisplay";
import { Flex, Space, Typography } from "antd";

const RestaurantContent = ({ foods, isInFilter, tagsList, fetchMeals } : RestaurantContentProps ) => {

    // foodList = [{ tag: string; foods: Array<FoodType>; }]
    const foodList = useMemo(() => {
        const myTagsList = tagsList.sort()
        const RECOMMEND_INDEX = myTagsList.findIndex((tag) => tag.name.toUpperCase() === 'RECOMMEND');
        if( RECOMMEND_INDEX !== -1 ) {
            //SWAP WITH Recommend
            const temp = myTagsList[RECOMMEND_INDEX];
            myTagsList[RECOMMEND_INDEX] = myTagsList[0];
            myTagsList[0] = temp;
        }
        return myTagsList.map((tag) => {
            return {
                tag: tag,
                foods: foods.filter((food) => food.categories.findIndex((ftag) => ftag.id === tag.id) !== -1)
            }
        })
    }, [tagsList, foods])


    const NormalDisplay = () => {
        return (
            <Flex key={1010} vertical className='w-full' gap="large" >
                {
                    foodList.map((item, i) => (
                        item.foods.length > 0 ? (
                        <Space key={'asdf' + i} direction='vertical' size="small" className="w-full">
                            <Typography.Text key={i + 'TAG'} className='font-bold text-xl'>
                                {item.tag.name.toUpperCase()}
                            </Typography.Text>
                            <Space key={'space' + i} direction='vertical' size='small' className="w-full">
                                {item.foods.map((food, i) => <FoodDisplay key={food.key + i} food={food} fetchMeals={fetchMeals} tagsList={tagsList}/>)}
                            </Space>
                        </Space>
                    ) : (<div key={i}></div>)
                    )
                    )
                }
            </Flex>
        )
    }

    const FilterDisplay = () => {
        return (
            <Flex key={101010} vertical className="w-full">
                <Typography.Text className='font-bold text-xl'>
                    Filter Results
                </Typography.Text>
                <Space direction="vertical" className="w-full">
                    {
                        foods.map((food) => <FoodDisplay key={food.key} food={food} fetchMeals={fetchMeals} tagsList={tagsList} />)
                    }
                </Space>
            </Flex>
        )
    }


    return !isInFilter ? <NormalDisplay /> : <FilterDisplay />
}

export default RestaurantContent