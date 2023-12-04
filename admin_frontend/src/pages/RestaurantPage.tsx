import { useState, useEffect } from 'react';
import ComputerRestaurantPage from './RestaurantSubPage/ComputerRestaurantPage';
import MobileRestaurantPage from './RestaurantSubPage/MobileRestaurantPage';
import { StoreType, dummyData, dummyStore } from '../interfaces/StoreInterface';
import { FoodType } from '../interfaces/FoodInterface';

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

const RestaurantPage = () => {

    const { height, width } = useWindowDimensions();
    const [store, setStore] = useState<StoreType>(dummyStore);
    const [foods, setFoods] = useState<FoodType[]>(dummyData);

    useEffect(() => {
        //TODO: fetch data from backend
        setStore(dummyStore)
        setFoods(dummyData)
        console.log(height)
    }, [])

    return (
        <div>
            {width > 844 ? <ComputerRestaurantPage store={store} foods={foods}  /> : <MobileRestaurantPage store={store} foods={foods} />}
        </div>
    )
}

export default RestaurantPage