import { Button, Flex } from "antd";
import { useEffect, useState } from "react";
import {
    OrdersProps,
    OrderState,
    OrderType,
} from "../../../../interfaces/OrderInterface";
import OrderMobileDisplay from "../../../../components/customer/order/OrderMobileDisplay";

const MobileOrderSubPage = ({ orders }: OrdersProps) => {
    const [orderState, setOrderState] = useState(OrderState.PENDING);
    // const [orders, setOrders] = useState<OrderType[]>([]);

    const onClickButtonProps = {
        className: "bg-orange-500 text-white",
    };

    const nonClickButtonProps = {
        className: "bg-gray-300",
    };

    useEffect(() => {
        // Backend here
        // setOrders(dummyOrder);
    }, [orderState]);

    return (
        <Flex vertical gap="large" className="w-full">
            <Flex
                justify="flex-start"
                align="center"
                gap="small"
                className="overflow-x-auto"
            >
                <Button
                    onClick={() => setOrderState(OrderState.PENDING)}
                    {...(orderState === OrderState.PENDING
                        ? { ...onClickButtonProps }
                        : { ...nonClickButtonProps })}
                >
                    PENDING
                </Button>
                <Button
                    onClick={() => setOrderState(OrderState.PREPARING)}
                    {...(orderState === OrderState.PREPARING
                        ? { ...onClickButtonProps }
                        : { ...nonClickButtonProps })}
                >
                    PREPARE
                </Button>
                <Button
                    onClick={() => setOrderState(OrderState.DONE)}
                    {...(orderState === OrderState.DONE
                        ? { ...onClickButtonProps }
                        : { ...nonClickButtonProps })}
                >
                    DONE
                </Button>
                <Button
                    onClick={() => setOrderState(OrderState.CANCELED)}
                    {...(orderState === OrderState.CANCELED
                        ? { ...onClickButtonProps }
                        : { ...nonClickButtonProps })}
                >
                    CANCELD
                </Button>
            </Flex>
            <Flex vertical gap="middle">
                {orders.map((order) => (
                    <OrderMobileDisplay
                        key={order.id}
                        order={order}
                        orderState={orderState}
                    />
                ))}
            </Flex>
        </Flex>
    );
};

export default MobileOrderSubPage;
