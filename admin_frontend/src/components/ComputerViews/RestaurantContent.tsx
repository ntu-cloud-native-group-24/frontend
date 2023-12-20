import React, { useMemo } from 'react';
import { RestaurantContentProps } from "../../interfaces/StoreInterface";
import { Flex, Space, Typography } from 'antd';
import FoodDisplay from './FoodDisplay';

const RestaurantContent = ({ foods, isInFilter, tagsList, fetchMeals } : RestaurantContentProps) => {

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
            <Flex vertical key={'shjenmedongxi'} className='pt-4 w-full' gap="large" >
                {
                    foodList.map((item, i) => (
                        item.foods.length > 0 ? (
                        <Space key={item.tag.id} direction='vertical' size="small">
                            <Typography.Text key={item.tag.id + 'tag'} className='font-bold text-xl'>
                                {item.tag.name.toUpperCase()}
                            </Typography.Text>
                            <Space key={'space' + i} direction='horizontal' size='middle' className='w-full overflow-x-auto p-3'>
                                {item.foods.map((food) => <FoodDisplay key={food.key} food={food} fetchMeals={fetchMeals} tagsList={tagsList} />)}
                            </Space>
                        </Space>
                        ) : (<React.Fragment key={'div' + i}></React.Fragment>)
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
                        foods.map((food) => <FoodDisplay key={food.key} food={food} fetchMeals={fetchMeals} tagsList={tagsList} />)
                    }
                </Space>
            </Flex>
        )
    }

    return !isInFilter ? <NormalDisplay key={'baichi'} /> : <FilterDisplay />
}

export default RestaurantContent;