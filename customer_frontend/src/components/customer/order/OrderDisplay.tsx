import { Card, Flex } from "antd";
import { OrderCProps, OrderState } from "../../../interfaces/OrderInterface";
import { useMemo } from "react";

const OrderDisplay = ({
    order,
    targetOrder,
    setTargetOrder,
    orderState,
}: OrderCProps) => {
    //TODO: check if order.price is already totalAmount or what
    const totalMoney = order.foods.reduce(
        (acc, v) =>
            (acc =
                acc +
                v.price +
                v.singleSelections.reduce(
                    (acc, v) =>
                        acc + v.selections.reduce((acc, v) => acc + v.price, 0),
                    0
                ) +
                v.multipleSelections.reduce(
                    (acc, v) =>
                        acc + v.selections.reduce((acc, v) => acc + v.price, 0),
                    0
                )),
        0
    );

    const cardStyle = useMemo(() => {
        if (order === targetOrder) {
            return {
                className: "bg-orange-500",
            };
        } else if (order.order_state === OrderState.CANCELED) {
            return {
                className: "bg-red-400",
            };
        } else return {};
    }, [order, targetOrder]);

    return order.order_state === orderState ? (
        <Card
            onClick={() => setTargetOrder(order)}
            hoverable
            style={{ width: "full" }}
            {...cardStyle}
        >
            <Flex justify="space-between" align="center" gap={20}>
                <Flex vertical className="w-3/4">
                    <p className="text-lg font-bold">Order #{order.id}</p>
                    <p>$ {totalMoney}</p>
                    <p className="truncate opacity-60">
                        {order.timestamp.toDateString()}
                    </p>
                </Flex>
            </Flex>
        </Card>
    ) : (
        <></>
    );
};

export default OrderDisplay;
