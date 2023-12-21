import { useEffect, useState, useMemo } from "react";
import { Flex, FloatButton, Spin, Statistic, Typography, message } from "antd";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    ArcElement,
} from "chart.js";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import { Line } from "react-chartjs-2";

import { orderApi } from "../../api/order";
import { OrderType } from "../../interfaces/OrderInterface";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

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

const CostOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "訂單花費統計圖",
        },
    },
    scales: {
        x: {
            offset: true,
        },
    },
};

const HomePage = () => {
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

    const completedOrders = [...orders]
        .filter((order: OrderType) => order.state === "completed")
        .reverse();

    console.log(completedOrders);

    // 最近一個月花費金額
    const currentDate = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);

    // 本月花費金額
    const monthlyCost = completedOrders.reduce((acc, cur: OrderType) => {
        const orderDate = new Date(cur.created_at);
        if (orderDate > oneMonthAgo && orderDate <= currentDate) {
            return acc + cur.calculated_total_price;
        }
        return acc;
    }, 0);

    const highestOrderCost = completedOrders.reduce((acc, cur: OrderType) => {
        return acc > cur.calculated_total_price
            ? acc
            : cur.calculated_total_price;
    }, 0);

    const allOrderCost = completedOrders.reduce((acc, cur: OrderType) => {
        return acc + cur.calculated_total_price;
    }, 0);

    const costData = useMemo(() => {
        const cumulativeData: number[] = [];

        completedOrders.reduce((acc, cur: OrderType) => {
            cumulativeData.push(acc + cur.calculated_total_price);
            return acc + cur.calculated_total_price;
        }, 0);

        return {
            labels: completedOrders.map((order: OrderType) => {
                return `${new Date(order.created_at).getMonth() + 1}/${new Date(
                    order.created_at
                ).getDate()}`;
            }),
            datasets: [
                {
                    label: "累計完成訂單花費統計圖",
                    data: cumulativeData,
                    fill: true,
                    backgroundColor: "rgb(1, 75, 78)",
                    borderColor: "rgba(1, 75, 78, 0.2)",
                },
            ],
        };
    }, [completedOrders]);

    return (
        <Flex
            vertical
            className="h-full pb-32"
            gap={width > 767 ? 128 : width < 380 ? 128 : 32}
        >
            <Flex vertical align="center">
                <Typography.Title level={4}>訂單花費統計</Typography.Title>
                <Flex justify="center" gap="large" wrap="wrap">
                    <Statistic title="最近一個月花費金額" value={monthlyCost} />
                    <Statistic
                        title="單筆訂單最高金額"
                        value={highestOrderCost}
                    />
                    <Statistic title="總訂單金額" value={allOrderCost} />
                </Flex>
                <Line
                    data={costData}
                    options={CostOptions}
                    width={"70vw"}
                    height={
                        width > 767 ? (width > 1280 ? "30vh" : "40vh") : "70vh"
                    }
                />
            </Flex>
        </Flex>
    );
};

export default HomePage;
