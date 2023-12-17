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
    OrderDetailType,
    OrderState,
    PaymentType,
} from "../../../interfaces/OrderInterface";
import { useState, useMemo, useEffect } from "react";
import {
    FoodDisplayProps,
    MealType,
    fallbackSRC,
} from "../../../interfaces/FoodInterface";
import { orderApi } from "../../../api/order";
import { storeApi } from "../../../api/store";

// get order detail using /api/orders/{order_id}

const OrderFoodDisplay = ({ food }: FoodDisplayProps) => {
    const OthersDisplay = () => {
        if (food.customizations.selectionGroups.length === 0) {
            return <></>;
        } else {
            return (
                <>
                    {food.customizations.selectionGroups.map((selection) => (
                        <Flex vertical>
                            <p className="opacity-100 text-[14px]">
                                {selection.title}
                            </p>
                            {selection.items.map((childSelection) => (
                                <p className="opacity-70 text-[12px]">
                                    {childSelection.name} ($
                                    {childSelection.price})
                                </p>
                            ))}
                        </Flex>
                    ))}
                </>
            );
        }
    };

    const NoteDisplay = () => {
        if (food.notes) {
            return (
                <>
                    <Flex gap="small" vertical>
                        <p className="opacity-70 text-[11px]">備註：</p>
                        <p className="opacity-50 text-[10px]">{food.notes}</p>
                    </Flex>
                </>
            );
        }
    };

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
                        x{food.quantity}
                    </Typography.Text>
                </Flex>
            </Flex>
            <OthersDisplay />
            <NoteDisplay />
            <Flex justify="center" gap={4}>
                <Typography.Text className="text-orange-400 text-md">
                    $
                </Typography.Text>
                <Typography.Text className="text-md">
                    {food.calculated_price_per_item}
                </Typography.Text>
            </Flex>
        </Flex>
    );
};

const OrderDetailDisplay = ({ order }: OrderDetailProps) => {
    const [orderDetail, setOrderDetail] = useState<OrderDetailType>();
    const [mealDetail, setMealDetail] = useState<MealType[]>([]);
    const [user, setUser] = useState({ name: "" });

    // get user info

    useEffect(() => {
        // get detail order
        if (!order) {
            return;
        }

        const getOrderDetailedInfo = async () => {
            const orderDetailedRes = await orderApi.getUserOrder(order.id);
            if (!orderDetailedRes || orderDetailedRes.status !== 200) {
                console.log("Mobile order detail error.");
                return;
            } else {
                const tmpOrderDetail = orderDetailedRes?.data.order;
                setOrderDetail(tmpOrderDetail);
                // get food info
                // console.log(tmpOrderDetail.details);
                for (const meal of tmpOrderDetail.details) {
                    const mealRes = await storeApi.getStoreMeal(
                        tmpOrderDetail.store_id.toString(),
                        meal.meal_id.toString()
                    );
                    if (!mealRes || mealRes.status !== 200) {
                        console.log("Mobile order mealRes error.");
                        return;
                    } else {
                        if (
                            !mealDetail.some(
                                (mealD) => mealD.order_id === tmpOrderDetail.id
                            )
                        ) {
                            const tmpMeal = {
                                ...meal,
                                picture: mealRes?.data.meal.picture,
                                name: mealRes?.data.meal.name,
                            };
                            setMealDetail([...mealDetail, tmpMeal]);
                        }
                    }
                }
            }
        };

        const tmp = localStorage.getItem("user");
        if (tmp) {
            setUser(JSON.parse(tmp));
        }
        getOrderDetailedInfo();
        console.log(orderDetail);
        console.log(mealDetail);
    }, [order]);

    const deliveryMethodText = useMemo(() => {
        if (!order) return "";
        if (orderDetail?.delivery_method === DeliveryMethod.DELIVERY) {
            return "By Deliver";
        } else {
            return "By Pick up";
        }
    }, [order, orderDetail]);

    const paymentTypeText = useMemo(() => {
        if (!order) return "";
        if (orderDetail?.payment_type === PaymentType.CASH) {
            return "By Cash";
        } else if (orderDetail?.payment_type === PaymentType.CREDIT_CARD) {
            return "By Credit Card";
        } else {
            return "By Monthly";
        }
    }, [order, orderDetail]);

    const orderStateText = useMemo(() => {
        if (!order) return "";
        if (orderDetail?.state === OrderState.PENDING) {
            return "PENDING";
        } else if (orderDetail?.state === OrderState.PREPARING) {
            return "PREPARE";
        } else if (orderDetail?.state === OrderState.DONE) {
            return "DONE";
        } else if (orderDetail?.state === OrderState.CANCELED) {
            return "CANCELED";
        } else {
            return "REJECTED BY CUSTOMERS";
        }
    }, [order, orderDetail]);

    const onRejectOrder = async () => {
        if (!order) {
            return;
        }
        console.log(order.id);
        console.log(order.state);
        const updateOrderRes = await orderApi.cancelUserOrder(
            order.id,
            OrderState.CANCELED
        );
        if (!updateOrderRes || updateOrderRes.status !== 200) {
            console.log("Mobile change order state error.");
            return;
        } else {
            order.state = OrderState.CANCELED;
            window.location.reload(false);
        }
    };

    return orderDetail ? (
        <Flex vertical gap="middle" className="pl-8 pr-8 w-full">
            <Typography.Title level={5}>Order Details</Typography.Title>
            <Card
                style={{ minHeight: 700, maxHeight: "full" }}
                title={
                    <Flex vertical className="w-3/4 pt-8 pb-8">
                        <p className="text-[14px] font-bold">
                            Order #{orderDetail?.id}
                        </p>
                        <p className="text-[10px] opacity-50">
                            {orderDetail?.created_at
                                ? new Date(
                                      orderDetail?.created_at
                                  ).toLocaleString()
                                : ""}
                        </p>
                    </Flex>
                }
                extra={
                    <Flex wrap="wrap" gap="middle" align="center">
                        <Statistic title="name" value={user.name} />
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
                                {orderDetail?.notes}
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
                            {/* <Statistic title="Address" value="N/A" /> */}
                            <Statistic
                                title="Order State"
                                value={orderStateText}
                            />
                        </Flex>
                    </Flex>
                    <Divider />
                    <Flex vertical gap="large">
                        {mealDetail
                            ?.filter(
                                (food) => food.order_id === orderDetail?.id
                            )
                            .map((ffood) => {
                                return (
                                    <>
                                        <OrderFoodDisplay
                                            key={ffood.id}
                                            food={ffood}
                                        />
                                        <Divider dashed />
                                    </>
                                );
                            })
                            .slice(0, orderDetail?.details.length)}
                    </Flex>
                    <Divider />
                    <Flex justify="space-between" align="center">
                        <Typography.Title level={3}>Total </Typography.Title>
                        <Flex justify="center" gap={4}>
                            <Typography.Text className="text-orange-400 text-xl">
                                $
                            </Typography.Text>
                            <Typography.Text className="text-xl">
                                {orderDetail?.total_price}
                            </Typography.Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Card>
            {orderDetail?.state === OrderState.PENDING ? (
                <Flex gap="large" justify="flex-end" align="center">
                    <Button type="primary" danger onClick={onRejectOrder}>
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
