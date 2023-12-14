import { Button, Flex } from "antd";
import { useEffect, useState } from "react";
import {
    OrderState,
    OrderType,
    dummyOrder,
} from "../../../../interfaces/OrderInterface";
import OrderDisplay from "../../../../components/customer/order/OrderDisplay";
import OrderDetailDisplay from "../../../../components/customer/order/OrderDetailDisplay";

const PCOrderSubPage = () => {
    const [orderState, setOrderState] = useState(OrderState.PENDING);
    const [orders, setOrders] = useState<OrderType[]>([]);
    const [targetOrder, setTargetOrder] = useState<OrderType>();

    const onClickButtonProps = {
        className: "bg-orange-500 text-white",
    };

    const nonClickButtonProps = {
        className: "bg-gray-300",
    };

    useEffect(() => {
        //TODO: backend here
        setOrders(dummyOrder);
    }, [orderState]);

    return (
        <Flex>
            <Flex vertical>
                <Flex
                    justify="flex-start"
                    align="center"
                    gap="small"
                    className="pb-4"
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
                        onClick={() => setOrderState(OrderState.PREPARE)}
                        {...(orderState === OrderState.PREPARE
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
