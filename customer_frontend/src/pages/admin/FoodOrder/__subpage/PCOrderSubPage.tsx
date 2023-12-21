import { Button, Flex } from "antd";
import { useEffect, useState } from "react";
import {
    OrdersProps,
    OrderState,
    OrderType,
} from "../../../../interfaces/OrderInterface";
import OrderDisplay from "../../../../components/admin/order/OrderDisplay";
import OrderDetailDisplay from "../../../../components/admin/order/OrderDetailDisplay";

const PCOrderSubPage = ({ orders }: OrdersProps) => {
    const [orderState, setOrderState] = useState(OrderState.PENDING);
    // const [orders, setOrders] = useState<OrderType[]>([]);
    const [targetOrder, setTargetOrder] = useState<OrderType>();

    const onClickButtonProps = {
        className: "bg-orange-500 text-white",
    };

    const nonClickButtonProps = {
        className: "bg-gray-300",
    };

    useEffect(() => {}, [orderState]);

    return (
        <Flex>
            <Flex vertical className="w-1/3">
                <Flex
                    justify="flex-start"
                    align="center"
                    gap="small"
                    className="pb-4 overflow-x-auto"
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
                        PREPARING
                    </Button>
                    <Button
                        onClick={() => setOrderState(OrderState.PREPARED)}
                        {...(orderState === OrderState.PREPARED
                            ? { ...onClickButtonProps }
                            : { ...nonClickButtonProps })}
                    >
                        PREPARED
                    </Button>
                    <Button
                        onClick={() => setOrderState(OrderState.COMPLETED)}
                        {...(orderState === OrderState.COMPLETED
                            ? { ...onClickButtonProps }
                            : { ...nonClickButtonProps })}
                    >
                        COMPLETED
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
                    {orders.map((order: OrderType) => (
                        <OrderDisplay
                            key={order.id}
                            order={order}
                            targetOrder={targetOrder}
                            setTargetOrder={setTargetOrder}
                            orderState={orderState}
                        />
                    ))}
                </Flex>
            </Flex>
            <OrderDetailDisplay order={targetOrder} />
        </Flex>
    );
};

export default PCOrderSubPage;
