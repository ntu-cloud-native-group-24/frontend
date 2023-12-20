import { Button, Flex, Spin, Empty, message } from "antd";
import { useContext, useEffect, useState, useCallback, useMemo } from "react";
import { OrderType } from "../../interfaces/OrderInterface";
import OrderDisplay from "../../components/ComputerViews/OrderDisplay";
import OrderDetailDisplay from "../../components/ComputerViews/OrderDetailDisplay";
import { StoreIdContext } from "../../App";
import { orderApi } from "../../api/order";

const OrderLayoutComputer = () => {

    const [orderStatus, setOrderStatus] = useState('all')
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

    // fetch at initial
    useEffect(() => {
        fetchOrders();
    }, [fetchOrders])

    // fetch every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            fetchOrders();
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [fetchOrders])

    const filterOrders = useMemo(() => {
        if( !orders ) return [];
        if( orderStatus === 'all' ) return orders.filter((order) => {
            return order.state === 'completed' || order.state === 'cancelled'
        });
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
                    <Button onClick={() => {setOrderStatus('all'); setTargetOrder(undefined)}} {...orderStatus === 'all' ? {...onClickButtonProps} : {...nonClickButtonProps} }>ALL</Button>
                    <Button onClick={() => {setOrderStatus('completed'); setTargetOrder(undefined)}} {...orderStatus === 'completed' ? {...onClickButtonProps} : {...nonClickButtonProps} }>COMPLETED</Button>
                    <Button onClick={() => {setOrderStatus('cancelled'); setTargetOrder(undefined)}} {...orderStatus === 'cancelled' ? {...onClickButtonProps} : {...nonClickButtonProps} }>CANCELLED</Button>
                </Flex>
                <Flex vertical gap='middle'>
                    {
                        filterOrders && filterOrders.length > 0 ? filterOrders.map((order) => (
                            <OrderDisplay key={order.id} order={order} targetOrder={targetOrder} setTargetOrder={setTargetOrder} />
                        )) : <Empty key={'empty'} description='無訂單' />
                    }
                </Flex>
            </Flex>
            <OrderDetailDisplay order={targetOrder} fetchOrders={fetchOrders} setTargetOrder={setTargetOrder} messageApi={messageApi}/>
        </Flex>
    )
}

export default OrderLayoutComputer;
