import { useEffect } from 'react';
import ComputerRestaurantPage from './RestaurantSubPage/ComputerRestaurantPage';
import MobileRestaurantPage from './RestaurantSubPage/MobileRestaurantPage';
import useWindowDimensions from '../utilities/windows';

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