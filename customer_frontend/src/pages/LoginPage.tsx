import { Button, Card, Flex, Input, Typography, message, Form } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { apiLogin, apiMe } from "../data/api";

export interface loginProps {
    login: boolean;
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginPage = ({ login, setLogin }: loginProps) => {
    const navigate = useNavigate();
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    const [messageApi, contextHolder] = message.useMessage();

    const handleSignUpClick = () => {
        navigate("/signup");
    };

    const success = (msg: string) => {
        messageApi.open({
            type: "success",
            content: msg,
        });
    };

    const error = (msg: string) => {
        messageApi.open({
            type: "error",
            content: msg,
        });
    };

    const warning = (msg: string) => {
        messageApi.open({
            type: "warning",
            content: msg,
        });
    };

    const onLogin = async (loginData: any) => {
        console.log(loginData);
        const { username, password } = loginData;

        if (username.length === 0 || password.length === 0) {
            warning("Please input username or password!");
            return;
        }
        // TODO: Backend here
        // CORS
        // await apiLogin(loginData).then((response) => {
        //     console.log(response);
        // }).error((err) => { error(err) });

        // await apiMe("").then((res) => {
        //     console.log(res);
        // });

        const result = true;
        if (!result) {
            error("Login Fail!");
        } else {
            setLogin(true);
            success("Login Success!");
            navigate("/");
        }
    };

    useEffect(() => {
        if (login) {
            navigate("/");
        }
    }, [login, navigate]);

    return (
        <Flex
            vertical
            justify="center"
            align="center"
            className='h-[calc(100vh_-_64px_-_30px)] w-full bg-cover bg-[url("/src/assets/background/bg_login.jpg")]'
        >
            {contextHolder}
            <Card
                title={
                    <Typography.Title level={2} className="pt-4">
                        Login
                    </Typography.Title>
                }
                style={{ width: "50%", minWidth: 350 }}
                className="opacity-90"
            >
                <Flex vertical gap="large">
                    <Form
                        name="login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onLogin}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Username!",
                                },
                            ]}
                        >
                            <Input placeholder="input username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Password!",
                                },
                            ]}
                        >
                            <Input
                                type="password"
                                placeholder="input password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Flex justify="space-between">
                                <Button
                                    type="link"
                                    size="small"
                                    onClick={handleSignUpClick}
                                >
                                    Don't have an account?
                                </Button>
                                <Button type="link" size="small">
                                    Forget password?
                                </Button>
                            </Flex>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="w-full"
                            >
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                    {/* <Flex vertical gap="middle">
                        <Input
                            placeholder="input username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Input.Password
                            placeholder="input password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Flex>
                    <Flex justify="space-between">
                        <Button
                            type="link"
                            size="small"
                            onClick={handleSignUpClick}
                        >
                            Don't have an account?
                        </Button>
                        <Button type="link" size="small">
                            Forget password?
                        </Button>
                    </Flex>
                    <Button type="primary" onClick={onLogin}>
                        Login
                    </Button> */}
                </Flex>
            </Card>
        </Flex>
    );
};

export default LoginPage;
