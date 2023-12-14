import {
    Button,
    Card,
    Flex,
    Typography,
    Statistic,
    Divider,
    Image,
} from "antd";
import {
    DeliveryMethod,
    OrderDetailProps,
    OrderState,
    PaymentType,
} from "../../../interfaces/OrderInterface";
import { useState, useMemo } from "react";
import {
    FoodDisplayProps,
    fallbackSRC,
} from "../../../interfaces/FoodInterface";

const OrderFoodDisplay = ({ food }: FoodDisplayProps) => {
    const totalMoney =
        food.price +
        food.singleSelections.reduce(
            (acc, v) => acc + v.selections.reduce((acc, v) => acc + v.price, 0),
            0
        ) +
        food.multipleSelections.reduce(
            (acc, v) => acc + v.selections.reduce((acc, v) => acc + v.price, 0),
            0
        );

    return (
        <Flex justify="space-between" align="center">
            <Flex gap="large" align="center">
                <Image
                    src={food.picture}
                    fallback={fallbackSRC}
                    width={96}
                    height={96}
                />
                <Flex vertical gap="small">
                    <Typography.Text>{food.name}</Typography.Text>
                    <Typography.Text className="opacity-60 text-[11px]">
                        x1
                    </Typography.Text>
                </Flex>
            </Flex>
            <Flex gap="small" vertical>
                {food.singleSelections.map((selection) => (
                    <Flex vertical>
                        <p className="opacity-100 text-[14px]">
                            {selection.title}
                        </p>
                        {selection.selections.map((childSelection) => (
                            <p className="opacity-70 text-[12px]">
                                {childSelection.name} (${childSelection.price})
                            </p>
                        ))}
                    </Flex>
                ))}
                {food.multipleSelections.map((selection) => (
                    <Flex vertical>
                        <p className="opacity-100 text-[14px]">
                            {selection.title}
                        </p>
                        {selection.selections.map((childSelection) => (
                            <p className="opacity-70 text-[12px]">
                                {childSelection.name} (${childSelection.price})
                            </p>
                        ))}
                    </Flex>
                ))}
            </Flex>
            <Flex justify="center" gap={4}>
                <Typography.Text className="text-orange-400 text-md">
                    $
                </Typography.Text>
                <Typography.Text className="text-md">
                    {totalMoney}
                </Typography.Text>
            </Flex>
        </Flex>
    );
};

const OrderDetailDisplay = ({ order }: OrderDetailProps) => {
    const [userPicture, setUserPicture] = useState(
        order ? order.user.picture_url : fallbackSRC
    );

    //TODO: check if order.price is already totalAmount or what
    const totalMoney = order
        ? order.foods.reduce(
              (acc, v) =>
                  (acc =
                      acc +
                      v.price +
                      v.singleSelections.reduce(
                          (acc, v) =>
                              acc +
                              v.selections.reduce((acc, v) => acc + v.price, 0),
                          0
                      ) +
                      v.multipleSelections.reduce(
                          (acc, v) =>
                              acc +
                              v.selections.reduce((acc, v) => acc + v.price, 0),
                          0
                      )),
              0
          )
        : 0;

    const deliveryMethodText = useMemo(() => {
        if (!order) return "";
        if (order.delivery_method === DeliveryMethod.DELIVER) {
            return "By Deliver";
        } else {
            return "By Pick up";
        }
    }, [order]);

    const paymentTypeText = useMemo(() => {
        if (!order) return "";
        if (order.payment_type === PaymentType.CASH) {
            return "By Cash";
        } else if (order.payment_type === PaymentType.CREDIT_CARD) {
            return "By Credit Card";
        } else {
            return "By Monthly";
        }
    }, [order]);

    const orderStateText = useMemo(() => {
        if (!order) return "";
        if (order.order_state === OrderState.PENDING) {
            return "PENDING";
        } else if (order.order_state === OrderState.PREPARE) {
            return "PREPARE";
        } else if (order.order_state === OrderState.DONE) {
            return "DONE";
        } else if (order.order_state === OrderState.CANCELED) {
            return "CANCELED";
        } else {
            return "REJECTED BY CUSTOMERS";
        }
    }, [order]);

    return order ? (
        <Flex vertical gap="middle" className="pl-8 pr-8 w-full">
            <Typography.Title level={5}>Order Details</Typography.Title>
            <Card
                style={{ minHeight: 700, maxHeight: "full" }}
                title={
                    <Flex vertical className="w-3/4 pt-8 pb-8">
                        <p className="text-[14px] font-bold">
                            Order #{order.id}
                        </p>
                        <p className="text-[10px] opacity-50">
                            {order.timestamp.toDateString()}
                        </p>
                    </Flex>
                }
                extra={
                    <Flex wrap="wrap" gap="middle" align="center">
                        <img
                            src={userPicture}
                            width={64}
                            height={64}
                            onError={() => setUserPicture(fallbackSRC)}
                        />
                        <Statistic title="Username" value={order.user.name} />
                    </Flex>
                }
            >
                <Flex vertical>
                    <Flex justify="space-between">
                        <Flex vertical className="w-1/2">
                            <Typography.Text className="text-[16px]">
                                Remark
                            </Typography.Text>
                            <Typography.Paragraph className="opacity-70 text-[12px]">
                                {order.notes}
                            </Typography.Paragraph>
                        </Flex>
                        <Flex
                            wrap="wrap"
                            gap="large"
                            className="h-full w-1/2 pl-4 pr-4"
                            justify="center"
                            align="center"
                        >
                            <Statistic
                                title="Delivery Method"
                                value={deliveryMethodText}
                            />
                            <Statistic
                                title="Payment Type"
                                value={paymentTypeText}
                            />
                            <Statistic title="Address" value="N/A" />
                            <Statistic
                                title="Order State"
                                value={orderStateText}
                            />
                        </Flex>
                    </Flex>
                    <Divider />
                    <Flex vertical gap="large">
                        {order.foods.map((food) => (
                            <>
                                <OrderFoodDisplay key={food.key} food={food} />
                                {food ===
                                order.foods[order.foods.length - 1] ? (
                                    <></>
                                ) : (
                                    <Divider dashed />
                                )}
                            </>
                        ))}
                    </Flex>
                    <Divider />
                    <Flex justify="space-between" align="center">
                        <Typography.Title level={3}>Total </Typography.Title>
                        <Flex justify="center" gap={4}>
                            <Typography.Text className="text-orange-400 text-xl">
                                $
                            </Typography.Text>
                            <Typography.Text className="text-xl">
                                {totalMoney}
                            </Typography.Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Card>
            {order.order_state === OrderState.PENDING ? (
                <Flex gap="large" justify="flex-end" align="center">
                    <Button type="primary" danger>
                        Cancel Order
                    </Button>
                </Flex>
            ) : (
                <></>
            )}
        </Flex>
    ) : (
        <></>
    );
};

export default OrderDetailDisplay;
