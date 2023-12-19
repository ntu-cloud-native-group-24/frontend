import { useEffect } from 'react';
import OrderLayoutComputer from '../../layout/FoodOrderLayout/OrderLayoutComputer';
import OrderLayoutMobile from '../../layout/FoodOrderLayout/OrderLayoutMobile';
import useWindowDimensions from '../../utilities/windows';

const TodayFoodOrder = () => {
    const { height, width } = useWindowDimensions();

    useEffect(() => {
      console.log(height);
    }, [height])
  
    return (
      <div>
        {width > 844 ? <OrderLayoutComputer /> : <OrderLayoutMobile />}
      </div>
    )
}

export default TodayFoodOrder