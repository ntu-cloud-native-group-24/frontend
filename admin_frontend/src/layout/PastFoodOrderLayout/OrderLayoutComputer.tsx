import { Button, Flex, Spin } from "antd";
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
        setSpinning(false);
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
            <Flex vertical>
                <Flex justify="flex-start" align="center" gap="small" className="pb-4">
                    <Button onClick={() => {setOrderStatus('all'); setTargetOrder(undefined)}} {...orderStatus === 'all' ? {...onClickButtonProps} : {...nonClickButtonProps} }>ALL</Button>
                    <Button onClick={() => {setOrderStatus('completed'); setTargetOrder(undefined)}} {...orderStatus === 'completed' ? {...onClickButtonProps} : {...nonClickButtonProps} }>COMPLETED</Button>
                    <Button onClick={() => {setOrderStatus('cancelled'); setTargetOrder(undefined)}} {...orderStatus === 'cancelled' ? {...onClickButtonProps} : {...nonClickButtonProps} }>CANCELLED</Button>
                </Flex>
                <Flex vertical gap='middle'>
                    {
                        filterOrders ? filterOrders.map((order) => (
                            <OrderDisplay key={order.id} order={order} targetOrder={targetOrder} setTargetOrder={setTargetOrder} />
                        )) : <></>
                    }
                </Flex>
            </Flex>
            <OrderDetailDisplay order={targetOrder} fetchOrders={fetchOrders} setTargetOrder={setTargetOrder}/>
        </Flex>
    )
}

export default OrderLayoutComputer;
