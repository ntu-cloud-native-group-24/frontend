import {
    Button,
    Flex,
    Layout,
    Typography,
    Card,
    Space,
    Tag,
    Row,
    Col,
} from "antd";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;

export interface CustomerProps {
    login: boolean;
}

const HomePage = ({ login }: CustomerProps) => {
    const navigate = useNavigate();

    const onClickSignup = () => {
        navigate("/signup");
    };

    const onClickLogin = () => {
        navigate("/login");
    };

    return (
        <Flex>
            {login ? (
                <Content className="max-h-full">
                    <Flex vertical gap={10} className="px-6">
                        {/* TODO: wrap into a tag component */}
                        <Flex
                            className="grid lg:grid-cols-12 md:grid-cols-8 grid-cols-6"
                            wrap="wrap"
                            gap={10}
                        >
                            <Button type="primary" onClick={onClickSignup}>
                                Login
                            </Button>
                            <Button type="primary" onClick={onClickSignup}>
                                Login
                            </Button>
                            <Button type="primary" onClick={onClickSignup}>
                                Login
                            </Button>
                            <Button type="primary" onClick={onClickSignup}>
                                Login
                            </Button>
                            <Button type="primary" onClick={onClickSignup}>
                                Login
                            </Button>
                        </Flex>

                        {/* coupons component, maybe there's no coupons */}
                        <Flex
                            className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3"
                            wrap="wrap"
                            gap={10}
                        >
                            <Button type="primary" onClick={onClickSignup}>
                                Login
                            </Button>
                            <Button type="primary" onClick={onClickSignup}>
                                Login
                            </Button>
                        </Flex>
                        {/* suggest meal component */}
                        <Flex
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
                        </Flex>
                        {/* default stores */}
                        <Row>
                            <Col span={6}>
                                {/* todo sidebar */}
                                <div>123</div>
                            </Col>
                            <Col span={18}>
                                <Flex
                                    className="grid md:grid-cols-3 grid-cols-1"
                                    wrap="wrap"
                                    gap={10}
                                >
                                    <Card
                                        bordered={false}
                                        size="small"
                                        cover={
                                            <img
                                                alt="example"
                                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                            />
                                        }
                                    >
                                        <div>
                                            <Space>
                                                <Tag>23 456</Tag>
                                            </Space>
                                            <Typography.Title
                                                level={3}
                                                style={{ fontSize: 16 }}
                                            >
                                                ML PASTA
                                            </Typography.Title>
                                        </div>
                                    </Card>
                                    <Card
                                        bordered={false}
                                        size="small"
                                        cover={
                                            <img
                                                alt="example"
                                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                            />
                                        }
                                    >
                                        <div>
                                            <Space>
                                                <Tag>23 456</Tag>
                                            </Space>
                                            <Typography.Title
                                                level={3}
                                                style={{ fontSize: 16 }}
                                            >
                                                ML PASTA
                                            </Typography.Title>
                                        </div>
                                    </Card>
                                    <Card bordered={false}>
                                        <p>Card content</p>
                                        <p>Card content</p>
                                        <p>Card content</p>
                                    </Card>
                                </Flex>
                            </Col>
                        </Row>
                    </Flex>
                </Content>
            ) : (
                <Content className="bg-blue-300 max-h-full">
                    <Flex vertical gap={0}>
                        <div className="h-[calc(100vh_-_64px)] w-full bg-cover bg-[url('/src/assets/background/bg_home.jpg')]">
                            <Flex
                                className="h-full w-full text-white pl-32 bg-black bg-opacity-50"
                                align="center"
                            >
                                <Flex vertical>
                                    <Typography.Title
                                        style={{ color: "white", fontSize: 72 }}
                                    >
                                        Choose The Foods
                                        <br />
                                        That Give You Energy
                                    </Typography.Title>
                                    <Flex gap="large">
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
