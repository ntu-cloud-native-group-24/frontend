import {
    Card,
    Flex,
    Button,
    Space,
    Table,
    Select,
    Statistic,
    Col,
    Row,
    message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { FoodType, fallbackSRC } from "../../interfaces/FoodInterface";
import {
    CartMealDataType,
    CartMealType,
    CartOrderType,
    OptionType,
} from "../../interfaces/CartInterface";
import { useEffect, useState } from "react";

const { success, warning, error } = message;

const CartPage = () => {
    const navigate = useNavigate();
    const strCartOrder = JSON.stringify({ store: {}, meals: [] });

    const cartOrder = JSON.parse(localStorage.getItem("cart") || strCartOrder);

    console.log(cartOrder);
    const { store, meals } = cartOrder;

    cartOrder.totalPrice = meals.reduce(
        (acc: number, current: CartMealType) =>
            acc + current.meal.price * current.quantity,
        0
    );

    useEffect(() => {
        return () => {
            localStorage.setItem("cart", JSON.stringify(cartOrder));
        };
    });

    const mealsData = cartOrder.meals.map(
        (meal: CartMealType, index: number) => {
            const {
                meal: food,
                quantity,
                notes,
                customization,
                customization_statuses,
            } = meal;
            return {
                key: food.id.toString() + index.toString(),
                image: food.picture ? food.picture : fallbackSRC,
                name: food.name,
                customization: customization,
                note: notes,
                price: food.price,
                quantity: meal,
                total: food.price * quantity,
                act: meal,
            };
        }
    );

    const handleChange = (meal: CartMealType, value: string) => {
        console.log(`selected`, meal, value);
        cartOrder.meals.find((m: CartMealType) => m === meal).quantity = value;
        localStorage.setItem("cart", JSON.stringify(cartOrder));
        window.location.reload();
    };

    const handleDelete = (meal: CartMealDataType) => {
        console.log(`selected`, meal.act);
        cartOrder.meals = cartOrder.meals.filter(
            (m: CartMealType) => m !== meal.act
        );
        if (cartOrder.meals.length === 0) {
            localStorage.removeItem("cart");
        } else {
            localStorage.setItem("cart", JSON.stringify(cartOrder));
        }
        window.location.reload();
    };

    const columns: ColumnsType<CartMealDataType> = [
        {
            title: "圖片",
            dataIndex: "image",
            key: "image",
            render: (image) => (
                <div className="w-24">
                    <img src={image} alt="meal" width={100} height={100} />
                </div>
            ),
        },
        {
            title: "商品",
            dataIndex: "name",
            key: "name",
            render: (text) => (
                <p className="w-12">
                    <b>{text}</b>
                </p>
            ),
        },
        {
            title: "客製化",
            dataIndex: "customization",
            key: "customization",
            render: (customization) => (
                <Flex vertical className="w-16">
                    {customization.map((option: OptionType) => (
                        <p key={option.name}>{option.name}</p>
                    ))}
                </Flex>
            ),
        },
        {
            title: "備註",
            dataIndex: "note",
            key: "note",
        },
        {
            title: "單價",
            dataIndex: "price",
            key: "price",
            render: (price) => <p>{"$" + price}</p>,
        },
        {
            title: "數量",
            key: "quantity",
            dataIndex: "quantity",
            render: (meal) => (
                <Select
                    defaultValue={meal.quantity}
                    style={{ width: 120 }}
                    onChange={(value) => {
                        handleChange(meal, value);
                    }}
                >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                        <Select.Option key={num} value={num}>
                            {num}
                        </Select.Option>
                    ))}
                </Select>
            ),
        },
        {
            title: "小計",
            dataIndex: "total",
            key: "total",
            render: (total) => <>{"$" + total}</>,
        },
        {
            title: "刪除",
            key: "act",
            render: (meal) => (
                <Button
                    type="primary"
                    danger
                    onClick={() => handleDelete(meal)}
                >
                    Delete
                </Button>
            ),
        },
    ];

    const handlePayment = () => {
        if (cartOrder.store.id) {
            navigate("/payment");
        } else {
            warning("There's no meals in your cart!");
        }
    };

    return (
        <Flex vertical gap="small">
            <Card title={store.name}>
                {/* TODO: table => wrap as a component */}
                <Table
                    columns={columns}
                    dataSource={mealsData}
                    className="overflow-x-auto"
                />
                <Flex align="center" className="grid grid-cols-12">
                    <Flex className="col-span-3">
                        <Statistic title="" value={`共${meals.length}項`} />
                    </Flex>
                    <Flex className="col-span-3">
                        <Statistic
                            title=""
                            value={
                                "總計: $" +
                                meals.reduce(
                                    (acc: number, current: CartMealType) =>
                                        acc +
                                        current.meal.price * current.quantity,
                                    0
                                )
                            }
                        />
                    </Flex>
                    <Flex className="col-span-6">
                        <Button
                            type="primary"
                            block
                            className="h-14 text-lg"
                            onClick={handlePayment}
                        >
                            Go to Checkout
                        </Button>
                    </Flex>
                </Flex>
            </Card>
        </Flex>
    );
};

export default CartPage;
