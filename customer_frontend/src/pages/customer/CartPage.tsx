import { Card, Flex, Button, Space, Table, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";


interface DataType {
    key: string;
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
        name: "牛肉麵",
        note: "不要香菜",
        price: 120,
        piece: 1,
        total: 120,
        act: "Delete",
    },
    {
        key: "2",
        name: "花干",
        note: "不要醬油",
        price: 50,
        piece: 1,
        total: 50,
        act: "Delete",
    },
    {
        key: "3",
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

    const handlePayment = ()=>{
        navigate("/payment");
    }

    return (
        <Flex vertical gap="small" style={{ width: "100%" }}>
            <Card title="ML Pasta">
                <Table columns={columns} dataSource={data} />
            </Card>

            <Button
                type="primary"
                block
                style={{ width: "30%", marginLeft: "auto" }}
                onClick={handlePayment}
            >
                Go to Checkout
            </Button>
        </Flex>
    );
};

export default CartPage;
