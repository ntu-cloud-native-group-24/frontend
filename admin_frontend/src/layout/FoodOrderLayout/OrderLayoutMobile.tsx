import { Button, Flex, Empty, Spin } from "antd";
import { useEffect, useState, useContext, useCallback, useMemo } from "react";
import { OrderType } from "../../interfaces/OrderInterface";
import OrderDisplay from "../../components/MobileViews/OrderDisplay";

import { StoreIdContext } from "../../App";
import { orderApi } from "../../api/order";

const OrderLayoutMobile = ( ) => {


    const [orderStatus, setOrderStatus] = useState('pending');
    const [orders, setOrders] = useState<OrderType[]>([])
    const [spinning, setSpinning] = useState<boolean>(true);
    const storeId = useContext<number>(StoreIdContext);

    const onClickButtonProps = {
        style: {
            backgroundColor: '#ff7a45',
            color: 'white',
        }
    }

    const nonClickButtonProps = {
        style: {
            backgroundColor: 'gray',
            color: 'black',
        }
    }

    const fetchOrders = useCallback( async () => {
        const response = await orderApi.getAllOrder(storeId);
        if( response && response.status === 200 ){
            setOrders(response.data.orders);
        } else {
            console.log(response);
        }
    }, [storeId]);

    useEffect(() => {
        fetchOrders();
        setSpinning(false);
    }, [fetchOrders])

    useEffect(() => {
        const interval = setInterval(() => {
            fetchOrders();
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [fetchOrders]);

    const filterOrders = useMemo(() => {
        if( !orders ) return [];
        return orders.filter((order) => {
            return order.state === orderStatus;
        });
    }, [orders, orderStatus])

    return (
        <Flex vertical gap="large" className="w-full">
            <Spin spinning={spinning} fullscreen/>
            <Flex justify="flex-start" align="center" gap="small" className="overflow-x-auto">
            <Button onClick={() => {setOrderStatus('pending')}} {...orderStatus === 'pending' ? {...onClickButtonProps} : {...nonClickButtonProps} }>PENDING</Button>
                    <Button onClick={() => {setOrderStatus('preparing');}} {...orderStatus === 'preparing' ? {...onClickButtonProps} : {...nonClickButtonProps} }>PREPARING</Button>
                    <Button onClick={() => {setOrderStatus('prepared'); }} {...orderStatus === 'prepared' ? {...onClickButtonProps} : {...nonClickButtonProps} }>PREPARED</Button>
            </Flex>
            <Flex vertical gap="middle">
                {
                    filterOrders && filterOrders.length > 0 ? filterOrders.map((order) => (
                        <OrderDisplay key={order.id} order={order} fetchOrders={fetchOrders} />
                    )) : <Empty key={'empty'} description='無訂單' />
                }
            </Flex>
        </Flex>
    )
}

export default OrderLayoutMobile;