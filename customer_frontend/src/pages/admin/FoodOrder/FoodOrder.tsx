import { useState, useEffect } from "react";
import PCOrderSubPage from "./__subpage/PCOrderSubPage";
import MobileOrderSubPage from "./__subpage/MobileOrderSubPage";

// import OrderLayoutMobile from "../../layout/FoodOrderLayout/OrderLayoutMobile";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
}

const FoodOrder = () => {
    const { height, width } = useWindowDimensions();

    useEffect(() => {
        console.log(height);
    }, [height]);

    return (
        <div>
            {/* <PCOrderSubPage /> */}
            {width > 844 ? <PCOrderSubPage /> : <MobileOrderSubPage />}
        </div>
    );
};

export default FoodOrder;
