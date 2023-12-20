import { Button, Empty, Flex, Spin, message } from "antd";
import { useContext, useEffect, useState, useCallback, useMemo } from "react";
import { OrderType } from "../../interfaces/OrderInterface";
import OrderDisplay from "../../components/ComputerViews/OrderDisplay";
import OrderDetailDisplay from "../../components/ComputerViews/OrderDetailDisplay";
import { StoreIdContext } from "../../App";
import { orderApi } from "../../api/order";

const OrderLayoutComputer = () => {

    const [orderStatus, setOrderStatus] = useState('pending')
    const [orders, setOrders] = useState<OrderType[]>([])
    const [spinning, setSpinning] = useState<boolean>(true);
    const [targetOrder, setTargetOrder] = useState<OrderType>()
    const [messageApi, contextHolder] = message.useMessage();
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
        setSpinning(true);
        const response = await orderApi.getAllOrder(storeId);
        if( response && response.status === 200 ){
            setOrders(response.data.orders);
        } else {
            console.log(response);
        }
        setSpinning(false);
    }, [storeId]);

    useEffect(() => {
        fetchOrders();
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
        <Flex>
            <Spin spinning={spinning} />
            {contextHolder}
            <Flex vertical>
                <Flex justify="flex-start" align="center" gap="small" className="pb-4">
                    <Button onClick={() => {setOrderStatus('pending'); setTargetOrder(undefined)}} {...orderStatus === 'pending' ? {...onClickButtonProps} : {...nonClickButtonProps} }>PENDING</Button>
                    <Button onClick={() => {setOrderStatus('preparing'); setTargetOrder(undefined)}} {...orderStatus === 'preparing' ? {...onClickButtonProps} : {...nonClickButtonProps} }>PREPARING</Button>
                    <Button onClick={() => {setOrderStatus('prepared'); setTargetOrder(undefined)}} {...orderStatus === 'prepared' ? {...onClickButtonProps} : {...nonClickButtonProps} }>PREPARED</Button>
                </Flex>
                <Flex vertical gap='middle'>
                    {
                        filterOrders  && filterOrders.length > 0 ? filterOrders.map((order) => (
                            <OrderDisplay key={order.id} order={order} targetOrder={targetOrder} setTargetOrder={setTargetOrder} />
                        )) : <Empty key={'empty'} description='無訂單' />
                    }
                </Flex>
            </Flex>
            <OrderDetailDisplay messageApi={messageApi} order={targetOrder} fetchOrders={fetchOrders} setTargetOrder={setTargetOrder}/>
        </Flex>
    )
}

export default OrderLayoutComputer;
