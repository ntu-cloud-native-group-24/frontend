// post /api/orders create an order
import { Card, Typography, Input, Radio, Space, Divider, List, Skeleton, Button } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const { Title } = Typography;
const { TextArea } = Input;
interface DataType {
    name: string;
    totalPrice: number;
    quantity: number;
}
const PaymentPage = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataType[]>([]);
    const [value, setValue] = useState('自取');
    const [payment, setPayment] = useState('Cash');

    const foodData = [{
        name: '牛肉麵',
        totalPrice: 120,
        quantity: 1,
    },
    {
        name: '花甘',
        totalPrice: 50,
        quantity: 1,
    },
    {
        name: '牛肉湯麵',
        totalPrice: 100,
        quantity: 1,
    }]
    const newData = [
        {
            name: 'John Brown',
            totalPrice: 32,
            quantity: 1,
        },
        {
            name: 'Jim Green',
            totalPrice: 42,
            quantity: 2,
        },
        {
            name: 'Joe Black',
            totalPrice: 32,
            quantity: 1,
        },
        {
            name: 'John Brown',
            totalPrice: 32,
            quantity: 1,
        },
        {
            name: 'Jim Green',
            totalPrice: 42,
            quantity: 2,
        },
        {
            name: 'Joe Black',
            totalPrice: 32,
            quantity: 1,
        },
        {
            name: 'John Brown',
            totalPrice: 32,
            quantity: 1,
        },
        {
            name: 'Jim Green',
            totalPrice: 42,
            quantity: 2,
        },
        {
            name: 'Joe Black',
            totalPrice: 32,
            quantity: 1,
        },
    ];

    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true)
        setData([...data, ...newData]);
        setLoading(false);
    }
    useEffect(() => {
        loadMoreData();
    }, []);

    const onChange = (e: RadioChangeEvent) => {
        console.log(`radio checked:${e.target.value}`);
        setValue(e.target.value);
    };
    const onChangePayment = (e: RadioChangeEvent) => {
        console.log(`Payment method checked:${e.target.value}`);
        setPayment(e.target.value);
    }
    return (<>
        <Space>
            <Card style={{ width: 500 }}> <Title>Store Name</Title>
                {/* <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            </Space> */}
                <Title level={3}>取餐方式</Title>
                <Radio.Group defaultValue="a" buttonStyle='solid' onChange={onChange} value={value} >
                    <Radio value={'自取'}>自取</Radio>
                    <Radio value={'外送'}>外送</Radio>
                </Radio.Group>
                <Title level={5}>地址
                    <Input placeholder="台北市大安區羅斯福路四段1號" />
                </Title>


                <Title level={3}>付款方式</Title>
                <Radio.Group onChange={onChangePayment} value={payment}>
                    <Space direction="vertical">
                        <Radio value={'Cash'}>Cash</Radio>
                        <Radio value={'Credit Card'}>Credit Card</Radio>
                        <Radio value={'Monthly'}>Monthly</Radio>
                    </Space>
                </Radio.Group>
                <Title level={3}>訂單備註</Title>
                <TextArea placeholder="請輸入備註" rows={6} />
                <Title level={3}>訂單摘要</Title>
                <div
                    id="scrollableDiv"
                    style={{
                        height: 400,
                        overflow: 'auto',
                        padding: '0 16px',
                        border: '1px solid rgba(140, 140, 140, 0.35)',
                    }}
                >
                    <InfiniteScroll
                        dataLength={data.length}
                        next={loadMoreData}
                        hasMore={data.length < 50}
                        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                        scrollableTarget="scrollableDiv"
                    >
                        <List dataSource={foodData} renderItem={(item) => (
                            <List.Item key={item.name}>
                                <List.Item.Meta
                                    title={<a href="https://ant.design">{item.name}</a>}
                                />
                                <div>{item.totalPrice}</div>
                            </List.Item>
                        )}
                        />
                        <List
                            dataSource={data}
                            renderItem={(item) => (
                                <List.Item key={item.name}>
                                    <List.Item.Meta
                                        title={<a href="https://ant.design">{item.name}</a>}
                                    />
                                    <div>{item.totalPrice}</div>
                                </List.Item>
                            )}
                        />
                    </InfiniteScroll>
                </div>

            </Card>
            <Space direction="vertical">
            <Card style={{ width: 500 }}>
                <Title level={3}>訂單總計金額</Title>bill info
                
            </Card>
            <Button type='primary' block>送出訂單</Button>
            </Space>
        </Space>
    </>);
};

export default PaymentPage;
