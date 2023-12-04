import { useMemo } from 'react';
import { RestaurantContentProps } from "../interfaces/StoreInterface";
import { Flex, Space, Typography } from 'antd';
import FoodDisplay from './FoodDisplay';

const RestaurantContent = ({ foods, isInFilter, tagsList } : RestaurantContentProps) => {

    // foodList = [{ tag: string; foods: Array<FoodType>; }]
    const foodList = useMemo(() => {
        const myTagsList = tagsList.sort()
        const RECOMMEND_INDEX = myTagsList.findIndex((tag) => tag.toUpperCase() === 'RECOMMEND');
        if( RECOMMEND_INDEX !== -1 ) {
            //SWAP WITH Recommend
            const temp = myTagsList[RECOMMEND_INDEX];
            myTagsList[RECOMMEND_INDEX] = myTagsList[0];
            myTagsList[0] = temp;
        }
        return myTagsList.map((tag) => {
            return {
                tag: tag,
                foods: foods.filter((food) => food.tags.findIndex((ftag) => ftag === tag) !== -1)
            }
        })
    }, [tagsList, foods])

    const NormalDisplay = () => {
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

    const FilterDisplay = () => {
        return (
            <Flex vertical className='pt-4 w-full'  >
                <Typography.Text className='font-bold text-xl'>
                    Filter Results
                </Typography.Text>
                <Space wrap className='pt-4 w-full'>
                    {
                        foods.map((food) => <FoodDisplay key={food.key} food={food} />)
                    }
                </Space>
            </Flex>
        )
    }

    return !isInFilter ? <NormalDisplay /> : <FilterDisplay />
}

export default RestaurantContent;