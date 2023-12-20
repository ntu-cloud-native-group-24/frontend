import { useState, useEffect } from "react";
import PCOrderSubPage from "./__subpage/PCOrderSubPage";
import MobileOrderSubPage from "./__subpage/MobileOrderSubPage";

import { orderApi } from "../../../api/order";

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

const FoodOrderPage = () => {
    const { height, width } = useWindowDimensions();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            const res = await orderApi.getUserOrders();
            console.log(res?.data);
            if (!res || res.status !== 200) {
                return;
            } else {
                setOrders(res?.data.orders);
            }
        };
        setTimeout(() => getOrders(), 0);
    }, []);

    return (
        <div>
            {/* <PCOrderSubPage /> */}
            {width > 844 ? (
                <PCOrderSubPage orders={orders} />
            ) : (
                <MobileOrderSubPage orders={orders} />
            )}
        </div>
    );
};

export default FoodOrderPage;
