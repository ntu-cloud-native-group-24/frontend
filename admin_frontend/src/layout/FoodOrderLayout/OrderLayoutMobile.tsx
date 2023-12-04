import { Button, Flex } from "antd";
import { useEffect, useState } from "react";
import { OrderStatus, OrderType, dummyOrder } from "../../interfaces/OrderInterface";
import OrderDisplay from "../../components/MobileViews/OrderDisplay";

const OrderLayoutMobile = ( ) => {
    const [orderStatus, setOrderStatus] = useState(OrderStatus.PENDING)
    const [orders, setOrders] = useState<OrderType[]>([])

    const onClickButtonProps = {
        className: 'bg-orange-500 text-white',
    }

    const nonClickButtonProps = {
        className: 'bg-gray-300',
    }

    useEffect(() => {
        // Backend here
        setOrders(dummyOrder)
    }, [orderStatus])

    return (
        <Flex vertical gap="large" className="w-full">
            <Flex justify="flex-start" align="center" gap="small" className="overflow-x-auto">
                <Button onClick={() => setOrderStatus(OrderStatus.PENDING)} {...orderStatus === OrderStatus.PENDING ? {...onClickButtonProps} : {...nonClickButtonProps} }>PENDING</Button>
                <Button onClick={() => setOrderStatus(OrderStatus.PREPARED)} {...orderStatus === OrderStatus.PREPARED ? {...onClickButtonProps} : {...nonClickButtonProps} }>PREPARE</Button>
                <Button onClick={() => setOrderStatus(OrderStatus.DONE)} {...orderStatus === OrderStatus.DONE ? {...onClickButtonProps} : {...nonClickButtonProps} }>DONE</Button>
            </Flex>
            <Flex vertical gap="middle">
                {
                    orders.map((order) => (
                        <OrderDisplay order={order} />
                    ))
                }
            </Flex>
        </Flex>
    )
}

export default OrderLayoutMobile;