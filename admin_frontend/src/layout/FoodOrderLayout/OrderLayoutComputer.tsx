import { Button, Flex } from "antd";
import { useEffect, useState } from "react";
import { OrderStatus, OrderType, dummyOrder } from "../../interfaces/OrderInterface";
import OrderDisplay from "../../components/ComputerViews/OrderDisplay";
import OrderDetailDisplay from "../../components/ComputerViews/OrderDetailDisplay";

const OrderLayoutComputer = () => {

    const [orderStatus, setOrderStatus] = useState(OrderStatus.PENDING)
    const [orders, setOrders] = useState<OrderType[]>([])
    const [targetOrder, setTargetOrder] = useState<OrderType>()

    const onClickButtonProps = {
        className: 'bg-orange-500 text-white',
    }

    const nonClickButtonProps = {
        className: 'bg-gray-300',
    }

    useEffect(() => {
        //TODO: backend here
        setOrders(dummyOrder)
    }, [orderStatus])

    return (
        <Flex>
            <Flex vertical>
                <Flex justify="flex-start" align="center" gap="small" className="pb-4">
                    <Button onClick={() => setOrderStatus(OrderStatus.PENDING)} {...orderStatus === OrderStatus.PENDING ? {...onClickButtonProps} : {...nonClickButtonProps} }>PENDING</Button>
                    <Button onClick={() => setOrderStatus(OrderStatus.PREPARED)} {...orderStatus === OrderStatus.PREPARED ? {...onClickButtonProps} : {...nonClickButtonProps} }>PREPARE</Button>
                    <Button onClick={() => setOrderStatus(OrderStatus.DONE)} {...orderStatus === OrderStatus.DONE ? {...onClickButtonProps} : {...nonClickButtonProps} }>DONE</Button>
                </Flex>
                <Flex vertical gap='middle'>
                    {
                        orders.map((order) => (
                            <OrderDisplay key={order.id} order={order} targetOrder={targetOrder} setTargetOrder={setTargetOrder} />
                        ))
                    }
                </Flex>
            </Flex>
            <OrderDetailDisplay order={targetOrder}/>
        </Flex>
    )
}

export default OrderLayoutComputer;
