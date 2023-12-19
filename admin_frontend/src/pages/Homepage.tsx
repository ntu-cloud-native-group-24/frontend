// 顧客數量（月）+ 新顧客（對比上個月）
// 食物排行榜
// 月營業額 + 對比上個月
import { useContext, useEffect, useCallback, useState, useMemo } from "react"
import { storeApi } from "../api/store"
import { StoreIdContext } from "../App"
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
} from 'chart.js';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { Line } from 'react-chartjs-2';
import useWindowDimensions from "../utilities/windows";
import { OrderResultType } from "../interfaces/StoreInterface";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Filler,
    Legend,
);

const customerOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '顧客數量統計圖',
      },
    },
};

const moneyOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '營業額統計圖',
      },
    },
};

const Homepage = () => {

    const storeId = useContext<number>(StoreIdContext);
    const [spinning, setSpinning] = useState(true);
    const [result, setResult] = useState<OrderResultType[]>([]);
    const [messageApi, contextHolder] = message.useMessage();
    const { width, height } = useWindowDimensions();

    const error = useCallback((msg: string) => {
        messageApi.error(msg);
    }, [messageApi])

    const fetchMonthlyRevenue = useCallback(async () => {
        setSpinning(true);
        const response = await storeApi.getMonthRevenue(storeId);
        if( response && response.status === 200 ){
            setResult(response.data.results.reverse());
        } else {
            error(response.data);
        }
        setSpinning(false);
    }, [storeId, error])

    useEffect(() => {
        fetchMonthlyRevenue();
        setSpinning(false);
    }, [fetchMonthlyRevenue])
    useEffect(() => {
    }, [height])

    const uniqueUserIdsByMonth = useMemo(() => {
        const uniqueUserIdsByMonth = result.map((item) => {
            const userIds = item.orders.map((order) => order.user_id);
            const uniqueUserIds = [...new Set(userIds)];
            return {
                month: item.month,
                uniqueUserIds: uniqueUserIds,
            };
        });
        return uniqueUserIdsByMonth;
    }, [result]);

    const customerData = useMemo(() => {
        return {
            labels: result.map((item) => item.month),
            datasets: [
                {
                    fill: true,
                    label: '顧客數量',
                    data: uniqueUserIdsByMonth.map((item) => item.uniqueUserIds.length),
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                }
            ]
        }
    }, [uniqueUserIdsByMonth, result])

    const moneyData = useMemo(() => {
        return {
            labels: result.map((item) => item.month),
            datasets: [
                {
                    fill: true,
                    label: '營業額',
                    data: result.map((item) => item.orders.reduce((acc, cur) => acc + cur.calculated_total_price, 0)),
                    borderColor: 'rgb(160, 32, 240)',
                    backgroundColor: 'rgba(160, 32, 240, 0.5)',
                }
            ]
        }
    }, [result])

    const totalCustomerAmount = useMemo(() => {
        return uniqueUserIdsByMonth.reduce((acc, cur) => {
            return acc + cur.uniqueUserIds.length;
        }, 0);
    }, [uniqueUserIdsByMonth])

    const newUserThisMonth = useMemo(() => {
        if( !uniqueUserIdsByMonth || uniqueUserIdsByMonth.length <= 0 ) return 0;
        const latestMonthData = uniqueUserIdsByMonth[uniqueUserIdsByMonth.length - 1];
        const pastMonthData = uniqueUserIdsByMonth.slice(0, uniqueUserIdsByMonth.length - 1);
        const collectedData = pastMonthData.flatMap((item) => item.uniqueUserIds);
        const newUsers = latestMonthData.uniqueUserIds.filter((item) => collectedData.includes(item));
        
        return newUsers
    }, [uniqueUserIdsByMonth])

    const totalMoneyData = useMemo(() => {
        return result.reduce((acc, cur) => {
            return acc + cur.orders.reduce((acc, cur) => acc + cur.calculated_total_price, 0);
        }, 0);
    }, [result])

    const highestMoneyData = useMemo(() => {
        return result.reduce((acc, cur) => {
            const totalMoney = cur.orders.reduce((acc, cur) => acc + cur.calculated_total_price, 0);
            return acc > totalMoney ? acc : totalMoney;
        }, 0);
    }, [result])

    const thisMonthMoneyData = useMemo(() => {
        if( !result || result.length <= 0 ) return 0;
        const thisMonthData = result[result.length - 1];
        return thisMonthData.orders.reduce((acc, cur) => acc + cur.calculated_total_price, 0);
    }, [result])

    return (
        <Flex vertical className="h-full pb-32" gap={width > 844 ? 128 : (width < 380 ? 128 : 32)}>
            <Spin spinning={spinning} fullscreen/>
            {contextHolder}
            <FloatButton onClick={fetchMonthlyRevenue} tooltip={<div>Refresh</div>} icon={<Loading3QuartersOutlined />} />
            <Flex vertical align="center" style={{ position: "relative", height: "40vh", width: "70vw" }}>
                <Typography.Title level={4}>顧客數量（月）</Typography.Title>
                <Flex justify='center' gap='large' wrap="wrap">
                    <Statistic title="這個月顧客數量" value={uniqueUserIdsByMonth && uniqueUserIdsByMonth.length > 0 ? uniqueUserIdsByMonth[uniqueUserIdsByMonth.length - 1].uniqueUserIds.length : 0} />
                    <Statistic title="這個月新顧客數量" value={newUserThisMonth ? newUserThisMonth.length : 0} />
                    <Statistic title="總顧客數量" value={totalCustomerAmount} />
                </Flex>
                <Line options={customerOptions} data={customerData} />
            </Flex>
            <Flex vertical align="center" style={{ position: "relative", height: "40vh", width: "70vw" }}>
                <Typography.Title level={4}>營業額（月）</Typography.Title>
                <Flex justify='center' gap='large' wrap="wrap">
                    <Statistic title="這個月營業金額" value={thisMonthMoneyData} />
                    <Statistic title="最高營業金額" value={highestMoneyData} />
                    <Statistic title="總營業金額" value={totalMoneyData} />
                </Flex>
                <Line options={moneyOptions} data={moneyData} />
            </Flex>
            {
                /*
                <Flex vertical align="center" style={{ position: "relative", height: "40vh", width: "70vw" }}>
                <Typography.Title level={4}>餐點排行榜</Typography.Title>
                <Pie data={data2} />
                </Flex>
                */
            }
        </Flex>
    )
}

export default Homepage