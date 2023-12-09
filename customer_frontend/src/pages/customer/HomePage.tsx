import { Button, Flex, Layout, Typography } from "antd";
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
                <div>HomePage</div>
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
