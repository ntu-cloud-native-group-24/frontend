import {
    Button,
    Card,
    Flex,
    Modal,
    Typography,
    Badge,
    Divider,
    Statistic,
    Image,
} from "antd";
import {
    DeliveryMethod,
    OrderDetailType,
    OrderMobileProps,
    OrderState,
    PaymentType,
} from "../../../interfaces/OrderInterface";
import { DollarOutlined } from "@ant-design/icons";
import { useMemo, useEffect, useState } from "react";
import { MealType, fallbackSRC } from "../../../interfaces/FoodInterface";
import { FoodDisplayProps } from "../../../interfaces/FoodInterface";

import { storeApi } from "../../../api/store";
import { orderApi } from "../../../api/order";

const { confirm } = Modal;

const OrderFoodDisplay = ({ food }: FoodDisplayProps) => {
    const OthersDisplay = () => {
        if (food.customizations.selectionGroups.length === 0) {
            return <p className="opacity-70 text-[11px]">配餐：無</p>;
        } else {
            return (
                <>
                    {food.customizations.selectionGroups.map((selection) => (
                        <Flex vertical>
                            <p className="opacity-70 text-[11px]">
                                {selection.title}
                            </p>
                            {selection.items.map((childSelection) => (
                                <p className="opacity-50 text-[10px]">
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
                    <Flex vertical>
                        <p className="opacity-70 text-[11px]">備註：</p>
                        <p className="opacity-50 text-[10px]">{food.notes}</p>
                    </Flex>
                </>
            );
        }
    };

    return (
        <Flex gap="middle" align="start">
            <Image
                src={food.picture}
                fallback={fallbackSRC}
                width={48}
                height={48}
            />
            <Flex vertical>
                <p className="font-bold">
                    {food.name} (${food.calculated_price_per_item})
                </p>
                <p>Amount: {food.quantity}</p>
                <OthersDisplay />
                <NoteDisplay />
            </Flex>
        </Flex>
    );
};

const OrderMobileDisplay = ({ order, orderState }: OrderMobileProps) => {
    const [orderDetail, setOrderDetail] = useState<OrderDetailType>();
    const [mealDetail, setMealDetail] = useState<MealType[]>([]);
    const [user, setUser] = useState({ name: "" });

    // get user info

    useEffect(() => {
        // get detail order
        const getOrderDetailedInfo = async () => {
            const orderDetailedRes = await orderApi.getUserOrder(order.id);
            if (!orderDetailedRes || orderDetailedRes.status !== 200) {
                console.log("Mobile order detail error.");
                return;
            } else {
                const tmpOrderDetail = orderDetailedRes?.data.order;
                setOrderDetail(tmpOrderDetail);
                // get food info
                console.log(tmpOrderDetail.details);
                for (const meal of tmpOrderDetail.details) {
                    const mealRes = await storeApi.getStoreMeal(
                        tmpOrderDetail.store_id.toString(),
                        meal.meal_id.toString()
                    );
                    if (!mealRes || mealRes.status !== 200) {
                        console.log("Mobile order mealRes error.");
                        return;
                    } else {
                        const tmpMeal = {
                            ...meal,
                            picture: mealRes?.data.meal.picture,
                            name: mealRes?.data.meal.name,
                        };
                        setMealDetail([...mealDetail, tmpMeal]);
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

    const badgeStatus = useMemo(() => {
        const state = orderDetail?.state;
        if (state === OrderState.PREPARING) {
            return "processing";
        } else if (state === OrderState.PENDING) {
            return "warning";
        } else if (state === OrderState.CANCELED) {
            return "error";
        } else {
            return "success";
        }
    }, [orderDetail]);

    const badgeText = useMemo(() => {
        const state = orderDetail?.state;
        if (state === OrderState.PREPARING) {
            return "PREPARING";
        } else if (state === OrderState.PENDING) {
            return "PENDING";
        } else if (state === OrderState.CANCELED) {
            return "CANCELED";
        } else {
            return "DONE";
        }
    }, [orderDetail]);

    const deliveryMethodText = useMemo(() => {
        if (orderDetail?.delivery_method === DeliveryMethod.DELIVERY) {
            return "By Deliver";
        } else {
            return "By Pick up";
        }
    }, [orderDetail]);

    const paymentTypeText = useMemo(() => {
        if (orderDetail?.payment_type === PaymentType.CASH) {
            return "By Cash";
        } else if (orderDetail?.payment_type === PaymentType.CREDIT_CARD) {
            return "By Credit Card";
        } else {
            return "By Monthly";
        }
    }, [orderDetail]);

    const onRejectOrder = async () => {
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

    // TODO: get order detail and user detail

    const OrderContent = () => {
        return (
            <Flex vertical gap="small" className="pb-8">
                <Flex vertical>
                    <p className="text-xl font-bold">
                        Order #{orderDetail?.id}
                    </p>
                    <Badge status={badgeStatus} text={badgeText} />
                    <p className="opacity-60">
                        {orderDetail?.created_at
                            ? new Date(orderDetail?.created_at).toLocaleString()
                            : ""}
                    </p>
                </Flex>
                <Divider />
                <Flex vertical gap="small">
                    {mealDetail?.map((food) => (
                        <OrderFoodDisplay key={food.id} food={food} />
                    ))}
                </Flex>
                <Divider />
                <Flex gap="small">
                    <DollarOutlined />
                    <p className="font-bold">
                        Total: ${orderDetail?.total_price}
                    </p>
                </Flex>
                <Divider />
                <Flex vertical justify="center">
                    <p className="font-bold text-lg">Notes</p>
                    <Typography.Paragraph className="opacity-80">
                        {orderDetail?.notes}
                    </Typography.Paragraph>
                </Flex>
                <Divider />
                <Flex wrap="wrap" gap="large">
                    <Statistic
                        title="Delivery Method"
                        value={deliveryMethodText}
                    />
                    <Statistic title="Payment Type" value={paymentTypeText} />
                    {/* <Statistic title="Address" value="N/A" /> */}
                    <Statistic title="Order State" value={badgeText} />
                </Flex>
                <Divider />
                <Flex wrap="wrap" gap="middle" align="center">
                    <Statistic title="Name" value={user.name} />
                </Flex>
            </Flex>
        );
    };

    const showOrderDetails = () => {
        confirm({
            title: `Order Details`,
            content: <OrderContent />,
            cancelText: "Close",
            footer: (_, { CancelBtn }) => (
                <>
                    <CancelBtn />
                    {orderDetail?.state === OrderState.PENDING ? (
                        <Button type="primary" danger onClick={onRejectOrder}>
                            Cancel Order
                        </Button>
                    ) : (
                        <></>
                    )}
                </>
            ),
        });
    };

    return orderDetail?.state === orderState ? (
        <Card
            onClick={showOrderDetails}
            hoverable
            style={{ width: "full" }}
            className={
                orderDetail?.state === OrderState.CANCELED ? "bg-red-400" : ""
            }
        >
            <Flex justify="space-between" align="center" gap={20}>
                <Flex vertical className="w-3/4">
                    <p className="text-lg font-bold">
                        Order #{orderDetail?.id}
                    </p>
                    {/* <p>$ {totalMoney}</p> */}
                    <p className="truncate opacity-60">
                        {new Date(orderDetail?.created_at).toLocaleString()}
                    </p>
                </Flex>
            </Flex>
        </Card>
    ) : (
        <></>
    );
};

export default OrderMobileDisplay;
