import { useState, useEffect } from 'react';
import OrderLayoutComputer from '../../layout/FoodOrderLayout/OrderLayoutComputer';
import OrderLayoutMobile from '../../layout/FoodOrderLayout/OrderLayoutMobile';

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
}

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return windowDimensions;
}


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