import { useEffect } from 'react';
import OrderLayoutComputer from '../../layout/PastFoodOrderLayout/OrderLayoutComputer';
import OrderLayoutMobile from '../../layout/PastFoodOrderLayout/OrderLayoutMobile';
import useWindowDimensions from '../../utilities/windows';

const PastFoodOrder = () => {
    const { height, width } = useWindowDimensions();

    useEffect(() => {
    }, [height])
  
    return (
      <div>
        {width > 844 ? <OrderLayoutComputer /> : <OrderLayoutMobile />}
      </div>
    )
}

export default PastFoodOrder