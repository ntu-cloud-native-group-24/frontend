import { Button, Flex, Layout, Row, Col, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { storeApi } from "../../api/store";
import { StoreType, TagType } from "../../interfaces/StoreInterface";
import StoreDisplay from "../../components/customer/store/StoreDisplay";

const { Content } = Layout;

export interface CustomerProps {
    login: boolean;
}

const HomePage = ({ login }: CustomerProps) => {
    const navigate = useNavigate();
    const [tags, setTags] = useState<TagType[]>([]);
    const [stores, setStores] = useState<StoreType[]>([]);

    // before Login
    const onClickSignup = () => {
        navigate("/signup");
    };
    const onClickLogin = () => {
        navigate("/login");
    };

    useEffect(() => {
        const getAllStores = async () => {
            // get tags
            const tagsRes = await storeApi.getAllTags();
            console.log(tagsRes?.data);
            if (!tagsRes || tagsRes.status !== 200) {
                return;
            } else {
                setTags(tagsRes?.data.tags);
            }

            // get stores and store tags
            const storesRes = await storeApi.getAllStores();
            console.log(storesRes?.data);
            if (!storesRes || storesRes.status !== 200) {
                return;
            } else {
                const tmpStores = [];
                for (let i = 0; i < storesRes?.data.stores.length; i++) {
                    const storeTagsRes = await storeApi.getStoreTags(
                        storesRes?.data.stores[i].id
                    );
                    console.log(storeTagsRes?.data);
                    if (!storeTagsRes || storeTagsRes.status !== 200) {
                        return;
                    } else {
                        const tmpStore = {
                            ...storesRes?.data.stores[i],
                            tags: storeTagsRes?.data.tags,
                        };
                        tmpStores.push(tmpStore);
                    }
                }
                setStores(tmpStores);
            }
        };
        getAllStores();
    }, []);

    return (
        <Flex>
            {login ? (
                <Content className="max-h-full p-4">
                    <Flex vertical gap={20} className="px-6">
                        {/* TODO: wrap into a tag component */}
                        <Flex
                            className="grid xl:grid-cols-10 lg:grid-cols-8 md:grid-cols-6 grid-cols-5"
                            wrap="wrap"
                            gap={10}
                        >
                            {tags.map((tag) => {
                                return (
                                    <Button
                                        type="primary"
                                        className="p-0 xl:h-20 md:h-14 h-12 lg:text-lg md:text-md text-xs font-bold"
                                        key={tag.id}
                                        value={tag.id}
                                        onClick={() => {
                                            navigate(`/search`, {
                                                state: { keyTag: tag.name },
                                            });
                                        }}
                                    >
                                        {tag.name}
                                    </Button>
                                );
                            })}
                        </Flex>
                        {/* suggest meal component */}
                        {/* <Flex
                            className="grid md:grid-cols-3 grid-cols-1"
                            wrap="wrap"
                            gap={10}
                        >
                            <Card
                                bordered={false}
                                cover={
                                    <img
                                        alt="example"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                    />
                                }
                            >
                                <Flex vertical justify="space-between">
                                    <div>
                                        <Space>
                                            <Tag>23 456</Tag>
                                        </Space>
                                        <Typography.Title
                                            level={2}
                                            style={{ fontSize: 24 }}
                                        >
                                            SAUSAGE DELIGHT
                                        </Typography.Title>
                                        <span>ML PASTA</span>
                                        <Typography.Paragraph>
                                            fdsjkflds;jkfld;sajkvfl;dsjvkfld;sgfdjslkgjfdkslb;fdsjkblf;dsjbfkdl;vfdsjvklfdsjiovjeirojvropesvr
                                        </Typography.Paragraph>
                                    </div>
                                    <div>
                                        <Button
                                            type="primary"
                                            onClick={onClickSignup}
                                        >
                                            Go and get it
                                        </Button>
                                    </div>
                                </Flex>
                            </Card>
                            <Card
                                bordered={false}
                                cover={
                                    <img
                                        alt="example"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                    />
                                }
                            >
                                <Flex vertical justify="space-between">
                                    <div>
                                        <Space>
                                            <Tag>23 456</Tag>
                                        </Space>
                                        <Typography.Title
                                            level={2}
                                            style={{ fontSize: 24 }}
                                        >
                                            SAUSAGE DELIGHT
                                        </Typography.Title>
                                        <span>ML PASTA</span>
                                        <Typography.Paragraph>
                                            fdsjkflds;jvklfdsjiovjeirojvropesvr
                                        </Typography.Paragraph>
                                    </div>
                                    <div>
                                        <Button
                                            type="primary"
                                            onClick={onClickSignup}
                                        >
                                            Go and get it
                                        </Button>
                                    </div>
                                </Flex>
                            </Card>
                            <Card bordered={false}>
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                            </Card>
                        </Flex> */}
                        {/* default stores */}
                        <Typography.Title level={3}>所有餐廳</Typography.Title>
                        <Row>
                            <Col span={24}>
                                <Flex
                                    className="grid xxl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-1"
                                    wrap="wrap"
                                    gap={10}
                                >
                                    {stores.map((store) => {
                                        console.log(stores);
                                        return (
                                            <StoreDisplay
                                                key={store.id}
                                                store={store}
                                                foods={[]}
                                            />
                                        );
                                    })}
                                </Flex>
                            </Col>
                        </Row>
                    </Flex>
                </Content>
            ) : (
                <Content className="bg-blue-300 max-h-full">
                    <Flex vertical>
                        <div className="h-[calc(100vh_-_64px)] w-full bg-cover bg-[url('/src/assets/background/bg_home.jpg')]">
                            <Flex
                                wrap="wrap"
                                className="h-full w-full text-white pl-10 bg-black bg-opacity-50"
                                align="center"
                                gap={10}
                            >
                                <Flex vertical>
                                    <p className="text-white p-0 m-0 lg:text-7xl md:text-5xl text-5xl">
                                        Choose The Foods
                                        <br />
                                        That Give You Energy
                                    </p>
                                    <Flex
                                        gap="large"
                                        className="h-full w-full pt-2"
                                    >
                                        <Button
                                            onClick={onClickSignup}
                                            type="primary"
                                            className="bg-black text-white w-[7rem] h-[3rem]"
                                        >
                                            Sign up
                                        </Button>
                                        <Button
                                            onClick={onClickLogin}
                                            type="primary"
                                            className="bg-white text-black w-[7rem] h-[3rem]"
                                        >
                                            Log in
                                        </Button>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </div>
                    </Flex>
                </Content>
            )}
        </Flex>
    );
};

export default HomePage;
