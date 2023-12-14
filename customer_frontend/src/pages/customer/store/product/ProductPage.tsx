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
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const ProductPage = () => {
    // GET product under store maybe
    // GET /api/store/{id}/meals/{meal-id}
    // GET /api/store/{id}/meals/{meal-id}/categories

    // using api when

    const navigate = useNavigate();

    const handleBackStore = () => {
        navigate("/store/1");
    };

    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log(values);
        message.success("Add to cart successfully!");
    };

    const onFinishFailed = () => {
        message.success("Add to cart failed!");
    };

    const dummyMeal = {
        id: 1,
        name: "curry udon",
        description:
            "stringfdsajflkdsjavbdsjakvncdsajkvbdsjabvdsajkvbdsajkbvsdakjbvkjsadfhdsjkafhewjkahfewkajlfheawkjfhl",
        price: 120,
        picture: "string",
        is_available: true,
        customizations: {
            selectionGroups: ["dsa", "as", "vdvds"],
        },
    };

    const dummyCategories = ["abc", "def"];

    return (
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
                        src="https://images.immediate.co.uk/production/volatile/sites/30/2023/06/Ultraprocessed-food-58d54c3.jpg?quality=90&resize=440,400"
                        alt="product"
                    />
                </div>
            </Flex>
            <Flex
                vertical
                className="md:col-start-7 md:col-span-4 col-start-1 col-span-12 p-4"
                gap="little"
            >
                <Title level={2}>{dummyMeal.name}</Title>
                <Space>
                    {dummyCategories.map((tag) => (
                        <Tag color="blue">{tag.toUpperCase()}</Tag>
                    ))}
                </Space>
                <Text className="text-lg">$ {dummyMeal.price}</Text>
                <Paragraph>{dummyMeal.description}</Paragraph>
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="customization_statuses"
                        label="selections"
                    >
                        <Radio.Group>
                            {dummyMeal.customizations.selectionGroups.map(
                                (selection) => (
                                    <Radio value={selection}>{selection}</Radio>
                                )
                            )}
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name="notes" label="備註：">
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item name="quantity" label="數量：">
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
    );
};

export default ProductPage;
