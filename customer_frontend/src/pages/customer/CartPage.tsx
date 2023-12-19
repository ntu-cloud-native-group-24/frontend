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
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";

interface DataType {
    key: string;
    image: string;
    name: string;
    note: string;
    price: number;
    piece: number;
    total: number;
    act: string;
}

const handleChange = (value: string) => {
    console.log(`selected ${value}`);
};

const columns: ColumnsType<DataType> = [
    {
        title: "圖片",
        dataIndex: "image",
        key: "image",
        render: (image) => (
            <img src={image} alt="food" width={100} height={100} />
        ),
    },
    {
        title: "商品",
        dataIndex: "name",
        key: "name",
        render: (text) => <a>{text}</a>,
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
        render: (price) => <>{"$" + price}</>,
    },
    {
        title: "數量",
        key: "piece",
        dataIndex: "piece",
        render: (piece) => (
            <Select
                defaultValue={piece}
                style={{ width: 120 }}
                onChange={handleChange}
            >
                <Select.Option value="1">1</Select.Option>
                <Select.Option value="2">2</Select.Option>
                <Select.Option value="3">3</Select.Option>
                <Select.Option value="4">4</Select.Option>
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
        render: () => (
            <Space size="middle">
                <a>Delete</a>
            </Space>
        ),
    },
];

const data: DataType[] = [
    {
        key: "1",
        image: "pic1",
        name: "牛肉麵",
        note: "不要香菜",
        price: 120,
        piece: 1,
        total: 120,
        act: "Delete",
    },
    {
        key: "2",
        image: "pic2",
        name: "花干",
        note: "不要醬油",
        price: 50,
        piece: 1,
        total: 50,
        act: "Delete",
    },
    {
        key: "3",
        image: "pic3",
        name: "牛肉湯麵",
        note: "不要香菜",
        price: 100,
        piece: 1,
        total: 100,
        act: "Delete",
    },
];

const CartPage = () => {
    const navigate = useNavigate();

    const cartOrder = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart") as string)
        : null;

    console.log(cartOrder);

    const handlePayment = () => {
        navigate("/payment");
    };

    return (
        <Flex vertical gap="small" style={{ width: "100%" }}>
            <Card title="ML Pasta">
                <Table columns={columns} dataSource={data} />
            </Card>
            <Row gutter={50} justify={"center"} align={"middle"}>
                <Col span={3} offset={3}>
                    <Statistic title="共" value={3 + "項"} />
                </Col>
                <Col span={3} offset={3}>
                    <Statistic title="總計" value={"$" + 270} />
                </Col>
                <Col span={10} offset={2}>
                    <Button
                        type="primary"
                        block
                        style={{ width: "60%" }}
                        onClick={handlePayment}
                    >
                        Go to Checkout
                    </Button>
                </Col>
            </Row>
        </Flex>
    );
};

export default CartPage;
