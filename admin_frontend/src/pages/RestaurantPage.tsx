import { useEffect } from 'react';
import ComputerRestaurantPage from './RestaurantSubPage/ComputerRestaurantPage';
import MobileRestaurantPage from './RestaurantSubPage/MobileRestaurantPage';
import useWindowDimensions from '../utilities/windows';

/*
1. Order -> Add one more type, COMPLETE (完成取餐) in OrderState
2.       -> 變成只有今日訂單管理及過去訂單管理
            -> 今日訂單管理就原樣
            -> 過去訂單管理 就變成顯示已經完成或是取消的訂單，並且兩者分開 categorys
            -> 這些order都以時間排序
3. 月結部分=-=
*/

const RestaurantPage = () => {

    const { height, width } = useWindowDimensions();

    useEffect(() => {
    }, [height])

    return (
        <div>
            {width > 844 ? <ComputerRestaurantPage /> : <MobileRestaurantPage />}
        </div>
    )
}

export default RestaurantPage