import { useMemo } from 'react';
import { RestaurantContentProps } from "../interfaces/StoreInterface";
import { Flex, Space, Typography } from 'antd';
import FoodDisplay from './FoodDisplay';

const RestaurantContent = ({ foods } : RestaurantContentProps) => {

    const tagsList = useMemo(() => {
        return foods.flatMap((food) => {
            return food.tags.map((tag) => tag)
        }).filter((v, i, arr) => arr.indexOf(v) === i);
    }, [foods])

    // foodList = [{ tag: string; foods: Array<FoodType>; }]
    const foodList = useMemo(() => {
        const RECOMMEND_INDEX = tagsList.findIndex((tag) => tag.toUpperCase() === 'RECOMMEND');
        if( RECOMMEND_INDEX !== -1 ) {
            //SWAP WITH Recommend
            const temp = tagsList[RECOMMEND_INDEX];
            tagsList[RECOMMEND_INDEX] = tagsList[0];
            tagsList[0] = temp;
        }
        return tagsList.map((tag) => {
            return {
                tag: tag,
                foods: foods.filter((food) => food.tags.findIndex((ftag) => ftag === tag) !== -1)
            }
        })
    }, [tagsList, foods])

    return (
        <Flex vertical className='pt-4 w-full' gap="large" >
            {
                foodList.map((item, i) => (
                    <Space key={i} direction='vertical' size="small">
                        <Typography.Text className='font-bold text-xl'>
                            {item.tag.toUpperCase()}
                        </Typography.Text>
                        <Space key={'space' + i} direction='horizontal' size='middle' className='w-full overflow-x-auto p-3'>
                            {item.foods.map((food) => <FoodDisplay key={food.key} food={food}/>)}
                        </Space>
                    </Space>
                ))
            }
        </Flex>
    )
}

export default RestaurantContent;