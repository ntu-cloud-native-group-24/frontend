import {
    Flex,
    Typography,
    Space,
    Tag,
    Button,
    Form,
    Input,
    Radio,
    Select,
    message,
    Checkbox,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FoodType, fallbackSRC } from "../../../../interfaces/FoodInterface";
import { CategoryType, StoreType } from "../../../../interfaces/StoreInterface";
import { storeApi } from "../../../../api/store";
import { OptionType } from "../../../../interfaces/CartInterface";
const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const ProductPage = () => {
    // GET product under store maybe
    // GET /api/store/{id}/meals/{meal-id}
    // GET /api/store/{id}/meals/{meal-id}/categories

    // using api when

    const navigate = useNavigate();
    const location = useLocation();

    const pathnameSplited = location.pathname.split("/");
    const meal_id = pathnameSplited[pathnameSplited.length - 1];
    const store_id = pathnameSplited[pathnameSplited.length - 2];

    const [food, setFood] = useState<FoodType>();
    const [store, setStore] = useState<StoreType>();
    const [foodPicture, setFoodPicture] = useState(food?.picture);

    useEffect(() => {
        const getMeal = async () => {
            // get store from store_id
            const storeRes = await storeApi.getStore(Number(store_id));
            console.log(storeRes?.data);
            if (!storeRes || storeRes.status !== 200) {
                return;
            } else {
                setStore(storeRes?.data.store);
            }

            // get meals from store
            const foodsRes = await storeApi.getStoreMeal(store_id, meal_id);
            console.log(foodsRes?.data);
            if (!foodsRes || foodsRes.status !== 200) {
                return;
            } else {
                const foodCategoriesRes = await storeApi.getStoreMealCategories(
                    store_id,
                    meal_id
                );

                console.log(foodCategoriesRes?.data);
                if (!foodCategoriesRes || foodCategoriesRes.status !== 200) {
                    return;
                } else {
                    const tmpFood = {
                        ...foodsRes?.data.meal,
                        categories: foodCategoriesRes?.data.categories.map(
                            (category: CategoryType) => {
                                return category.name;
                            }
                        ),
                    };
                    setFood(tmpFood);
                    console.log(tmpFood);
                    setFoodPicture(tmpFood.picture);
                }
            }
        };
        getMeal();
        // setStore(dummyStore);
        // setFoods(dummyData);
        // console.log(height);
    }, [store_id, meal_id]);

    const handleBackStore = () => {
        navigate(`/store/${store_id}`);
    };

    const [form] = Form.useForm();

    const onFinish = () => {
        const oldCart = localStorage.getItem("cart")
            ? JSON.parse(localStorage.getItem("cart")!)
            : {
                  store: store,
                  meals: [],
              };
        if (
            !(oldCart.store.id === store?.id || oldCart.store.id === undefined)
        ) {
            message.error("Cannot add food from different store!");
            return;
        }

        if (oldCart.meals.some((meal: any) => meal.meal.id === food?.id)) {
            message.error("Food already in cart!");
            return;
        }

        console.log(form.getFieldsValue());
        const submitValue = form.getFieldsValue();

        if (!food) {
            message.error("food not exist!");
            return;
        }

        // shallow copy of food
        const tmpFood = { ...food };

        const customization_statuses: boolean[] = [];
        const tmpCustomization: OptionType[] = [];

        food.customizations.selectionGroups.map((selection) => {
            selection.items.map((item) => {
                // console.log(item);
                if (!item.enabled) {
                    customization_statuses.push(false);
                } else {
                    if (selection.type === "radio") {
                        console.log(selection.title, item.name);
                        console.log(submitValue.customization[selection.title]);
                        if (
                            selection.title in submitValue.customization &&
                            submitValue.customization[selection.title].name ==
                                item.name
                        ) {
                            customization_statuses.push(true);
                            tmpCustomization.push({
                                name: item.name,
                                value: item.price,
                            });
                            tmpFood.price += item.price;
                        } else {
                            customization_statuses.push(false);
                        }
                    } else if (selection.type === "checkbox") {
                        if (
                            selection.title in submitValue.customization &&
                            submitValue.customization[selection.title].some(
                                (selectItem: { name: string; price: number }) =>
                                    selectItem.name === item.name
                            )
                        ) {
                            customization_statuses.push(true);
                            tmpCustomization.push({
                                name: item.name,
                                value: item.price,
                            });
                            tmpFood.price += item.price;
                        } else {
                            customization_statuses.push(false);
                        }
                    }
                }
            });
        });

        console.log(customization_statuses);

        const cartMeal = {
            meal: tmpFood,
            quantity: submitValue.quantity,
            notes: submitValue.notes,
            customization_statuses: customization_statuses,
            customization: tmpCustomization,
        };

        const cartOrder = {
            store: store,
            meals: [...oldCart.meals, cartMeal],
        };

        localStorage.setItem("cart", JSON.stringify(cartOrder));
        message.success("Add to cart successfully!");
    };

    const onFinishFailed = () => {
        // message.error("Add to cart failed!");
    };

    return store && food ? (
        <Flex className="grid grid-cols-12">
            <Flex
                vertical
                className="md:col-start-3 md:col-span-4 col-start-1 col-span-12 p-4 sticky top-[64]"
            >
                <div className="border-box">
                    <Button
                        type="link"
                        icon={<ArrowLeftOutlined />}
                        className="bg-transparent text-left text-black"
                        size="large"
                        block
                        onClick={handleBackStore}
                    >
                        Back to Store
                    </Button>
                </div>

                <div className="w-full">
                    <img
                        src={foodPicture}
                        alt={food.name}
                        className="object-cover w-full h-[400px]"
                        onError={() => setFoodPicture(fallbackSRC)}
                    />
                </div>
            </Flex>
            <Flex
                vertical
                className="md:col-start-7 md:col-span-4 col-start-1 col-span-12 p-4"
                gap="little"
            >
                <Title level={2}>{food.name}</Title>
                <Space>
                    {food.categories.map((category, index) => (
                        <Tag color="blue" key={index}>
                            {category.toUpperCase()}
                        </Tag>
                    ))}
                </Space>
                <Text className="text-lg">$ {food.price}</Text>
                <Paragraph>{food.description}</Paragraph>
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    {food.customizations.selectionGroups.map(
                        (selection, index) => {
                            if (selection.type === "radio") {
                                return (
                                    <Form.Item
                                        name={[
                                            "customization",
                                            selection.title,
                                        ]}
                                        label={selection.title}
                                        key={index}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please select required options!",
                                            },
                                        ]}
                                    >
                                        <Radio.Group>
                                            {selection.items.map(
                                                (item, iindex) => (
                                                    <Radio
                                                        value={{
                                                            name: item.name,
                                                            price: item.price,
                                                        }}
                                                        disabled={!item.enabled}
                                                        key={iindex}
                                                    >
                                                        {item.name}: $
                                                        {item.price}
                                                    </Radio>
                                                )
                                            )}
                                        </Radio.Group>
                                    </Form.Item>
                                );
                            } else if (selection.type === "checkbox") {
                                return (
                                    <Form.Item
                                        name={[
                                            "customization",
                                            selection.title,
                                        ]}
                                        label={selection.title}
                                        key={index}
                                    >
                                        <Checkbox.Group>
                                            {selection.items.map(
                                                (item, iindex) => (
                                                    <Checkbox
                                                        value={{
                                                            name: item.name,
                                                            price: item.price,
                                                        }}
                                                        disabled={!item.enabled}
                                                        key={iindex}
                                                    >
                                                        {item.name}: $
                                                        {item.price}
                                                    </Checkbox>
                                                )
                                            )}
                                        </Checkbox.Group>
                                    </Form.Item>
                                );
                            }
                        }
                    )}

                    <Form.Item name="notes" label="備註：">
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item
                        name="quantity"
                        label="數量："
                        rules={[
                            {
                                required: true,
                                message: "Please input quantity!",
                            },
                        ]}
                    >
                        <Select>
                            {Array.from({ length: 10 }, (_, i) => i + 1).map(
                                (num) => (
                                    <Select.Option key={num} value={num}>
                                        {num}
                                    </Select.Option>
                                )
                            )}
                        </Select>
                    </Form.Item>
                    <Form.Item label="">
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="bg-black text-white"
                            size="large"
                            block
                        >
                            Add to Cart
                        </Button>
                    </Form.Item>
                </Form>
            </Flex>
        </Flex>
    ) : (
        <></>
    );
};

export default ProductPage;
