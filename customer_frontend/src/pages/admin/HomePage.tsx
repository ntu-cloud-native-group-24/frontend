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

    const completedOrders = [...orders].filter(
        (order: OrderType) => order.state === "completed"
    );

    console.log(completedOrders);

    // 本月花費金額
    const monthlyCost = completedOrders.reduce((acc, cur: OrderType) => {
        const month = new Date(cur.created_at).getMonth();
        const date = new Date(cur.created_at).getDate();
        const today = new Date().getDate();
        return month === new Date().getMonth() && date === today
            ? acc + cur.calculated_total_price
            : acc;
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
        // const monthlyData = new Array(12).fill(0);
        // completedOrders.forEach((order: OrderType) => {
        //     const month = new Date(order.created_at).getMonth();
        //     monthlyData[month] += order.calculated_total_price;
        // });
        // return monthlyData;
        const cumulativeData: number[] = [];

        completedOrders.reduce((acc, cur: OrderType) => {
            cumulativeData.push(acc + cur.calculated_total_price);
            return acc + cur.calculated_total_price;
        }, 0);

        return {
            labels: completedOrders.map((order: OrderType) => {
                return `${new Date(order.created_at).getMonth()}/${new Date(
                    order.created_at
                ).getDate()}`;
            }),
            datasets: [
                {
                    label: "累計完成訂單花費統計圖",
                    data: cumulativeData,
                    fill: true,
                    backgroundColor: "rgb(0, 233, 242)",
                    borderColor: "rgba(0, 233, 242, 0.2)",
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
            <Flex vertical align="center" style={{ width: "100%" }}>
                <Typography.Title level={4}>訂單花費折線圖</Typography.Title>
                <Flex justify="center" gap="large" wrap="wrap">
                    <Statistic title="最近一個月花費金額" value={monthlyCost} />
                    <Statistic
                        title="單筆訂單最高金額"
                        value={highestOrderCost}
                    />
                    <Statistic title="總訂單金額" value={allOrderCost} />
                </Flex>
                <Line data={costData} options={CostOptions} />
            </Flex>
        </Flex>
    );
};

export default HomePage;
