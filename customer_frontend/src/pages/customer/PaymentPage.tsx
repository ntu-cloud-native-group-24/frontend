// post /api/orders create an order
import {
    Card,
    Typography,
    Input,
    Radio,
    List,
    Button,
    Flex,
    Badge,
    Form,
    message,
} from "antd";
import { useState, useEffect } from "react";
import {
    DeliveryMethod,
    OrderSubmitType,
    PaymentType,
} from "../../interfaces/OrderInterface";
import { CartMealType } from "../../interfaces/CartInterface";
import { useNavigate } from "react-router-dom";

import { orderApi } from "../../api/order";

const { success, warning, error } = message;

const { Title } = Typography;
const { TextArea } = Input;

const PaymentPage = () => {
    const [delivery, setDelivery] = useState<DeliveryMethod>(
        DeliveryMethod.PICKUP
    );
    const [deliveryCost, setDeliveryCost] = useState<number>(0); // [0, 50
    const [payment, setPayment] = useState<PaymentType>(PaymentType.CASH);
    const [paymentDiscount, setPaymentDiscount] = useState<number>(0); // [0, 20]

    const cartOrder = JSON.parse(
        localStorage.getItem("cart") || "{ store: {}, meals: [] }"
    );
    const { store, meals, totalPrice } = cartOrder;

    const [form] = Form.useForm();

    const navigate = useNavigate();

    const onCreateOrder = async () => {
        const values = form.getFieldsValue();
        console.log("Received values of form: ", values);
        const orderSubmit: OrderSubmitType = {
            store_id: store.id,

            order: {
                items: meals.map((meal: CartMealType) => {
                    return {
                        meal_id: meal.meal.id,
                        quantity: meal.quantity,
                        notes: meal.notes ? meal.notes : "",
                        customization_statuses: meal.customization_statuses,
                    };
                }),
                notes: values.notes ? values.notes : "",
                payment_type: payment,
                delivery_method: delivery,
            },
        };

        console.log(orderSubmit);

        const res = await orderApi.createUserOrder(orderSubmit);
        if (!res || res.status !== 200) {
            error(res?.data.message);
        } else {
            console.log(res?.data);
            success("Successfully created order!");
            localStorage.setItem(
                "cart",
                JSON.stringify({ store: {}, meals: [] })
            );
            await setTimeout(() => {
                navigate("/");
            }, 1000);
        }
    };

    const onCreateOrderFailed = () => warning("Create Order Failed!");

    const onChangeDelivery = (value: DeliveryMethod) => {
        console.log(`radio checked:${value}`);
        console.log(value);
        setDelivery(value);
        setDeliveryCost(value === DeliveryMethod.DELIVERY ? 50 : 0);
    };
    const onChangePayment = (value: PaymentType) => {
        console.log(`Payment method checked:${value}`);
        console.log(value);
        setPayment(value);
        setPaymentDiscount(value === PaymentType.MONTHLY ? 20 : 0);
    };

    return (
        <>
            <Flex
                wrap="wrap"
                justify="space-evenly"
                align="center"
                className="grid grid-cols-12 gap-4"
            >
                <Card className="xl:col-start-3 xl:col-span-4 md:col-span-6 col-span-12">
                    <Title>{store.name}</Title>
                    <Flex vertical justify="space-evenly">
                        <Form
                            form={form}
                            layout="vertical"
                            name="payment"
                            onFinish={onCreateOrder}
                            onFinishFailed={onCreateOrderFailed}
                        >
                            <Title level={3}>取餐方式</Title>
                            <Form.Item
                                name="delivery_method"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please select delivery method!",
                                    },
                                ]}
                            >
                                <Radio.Group
                                    onChange={(e) =>
                                        onChangeDelivery(e.target.value)
                                    }
                                >
                                    <Radio value={DeliveryMethod.PICKUP}>
                                        自取
                                    </Radio>
                                    <Radio value={DeliveryMethod.DELIVERY}>
                                        外送
                                    </Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label="地址" name="address">
                                <Input
                                    placeholder={store.address}
                                    disabled={
                                        delivery === DeliveryMethod.PICKUP
                                    }
                                />
                            </Form.Item>
                            <Title level={3}>付款方式</Title>

                            <Form.Item
                                name="payment_type"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select payment!",
                                    },
                                ]}
                            >
                                <Radio.Group
                                    onChange={(e) =>
                                        onChangePayment(e.target.value)
                                    }
                                >
                                    <Radio value={PaymentType.CASH}>Cash</Radio>
                                    <Radio value={PaymentType.CREDIT_CARD}>
                                        Credit Card
                                    </Radio>
                                    <Radio value={PaymentType.MONTHLY}>
                                        Monthly
                                    </Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Title level={3}>訂單備註</Title>
                            <Form.Item name="notes">
                                <TextArea placeholder="請輸入備註" rows={6} />
                            </Form.Item>
                        </Form>

                        <Title level={3}>訂單摘要</Title>
                        <div
                            id="scrollableDiv"
                            className="h-[500px] overflow-auto p-4 border border-gray-300"
                        >
                            <List
                                dataSource={meals}
                                renderItem={(item: CartMealType) => (
                                    <List.Item key={item.meal.name}>
                                        <Badge
                                            count={item.quantity}
                                            color="#52c41a"
                                            style={{ marginRight: "10px" }}
                                        />
                                        <List.Item.Meta
                                            title={
                                                <a
                                                    onClick={() =>
                                                        navigate(
                                                            `/stores/${store.id}/${item.meal.id}`
                                                        )
                                                    }
                                                >
                                                    {item.meal.name}
                                                </a>
                                            }
                                            description={
                                                <p>
                                                    {item.customization.map(
                                                        (custom) => {
                                                            return (
                                                                custom.name +
                                                                " "
                                                            );
                                                        }
                                                    )}
                                                </p>
                                            }
                                        />
                                        <div>
                                            {"$" +
                                                item.meal.price * item.quantity}
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </div>
                    </Flex>
                </Card>
                <Flex
                    className="xl:col-start-7 xl:col-span-4 md:col-span-6 col-span-12"
                    wrap="wrap"
                    vertical
                >
                    <Card className="w-full">
                        <Title level={3}>訂單總計金額</Title>
                        <Flex align="center" justify="space-between">
                            <Title level={5}>小計</Title>
                            <Title level={5}>${totalPrice}</Title>
                        </Flex>
                        <Flex align="center" justify="space-between">
                            <Title level={5}>優惠</Title>
                            <Title level={5}>-${paymentDiscount}</Title>
                        </Flex>
                        <Flex align="center" justify="space-between">
                            <Title level={5}>外送費</Title>
                            <Title level={5}>${deliveryCost}</Title>
                        </Flex>
                        <Flex align="center" justify="space-between">
                            <Title level={5}>其他費用</Title>
                            <Title level={5}>$0</Title>
                        </Flex>
                        <Flex align="center" justify="space-between">
                            <Title level={3}>總計</Title>
                            <Title level={3}>
                                ${totalPrice - paymentDiscount + deliveryCost}
                            </Title>
                        </Flex>
                    </Card>
                    <Button
                        type="primary"
                        block
                        htmlType="submit"
                        onClick={() => form.submit()}
                        style={{
                            background: "yellowgreen",
                            height: "75px",
                            fontSize: "23px",
                        }}
                        className="w-full"
                    >
                        送出訂單
                    </Button>
                </Flex>
            </Flex>
        </>
    );
};

export default PaymentPage;
