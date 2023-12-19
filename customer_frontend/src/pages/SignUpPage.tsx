import { Button, Card, Flex, Form, Input, Typography, message } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useCookies } from "react-cookie";

import { userApi } from "../api/user";

export interface SignUpProps {
    login: boolean;
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUpPage = ({ login, setLogin }: SignUpProps) => {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [cookies, setCookie] = useCookies(["token"]);

    const [form] = Form.useForm<{
        name: string;
        email: string;
        username: string;
        password: string;
    }>();

    const handleLoginClick = () => {
        navigate("/login");
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

    const onSignUp = async () => {
        const { name, email, username, password } = form.getFieldsValue();

        const res = await userApi.register(name, email, username, password);
        if (!res || res.status !== 200) {
            error(res?.data.message);
        } else {
            console.log(res?.data);
            success(res?.data.message);
        }

        const loginRes = await userApi.login(username, password);
        if (!loginRes || loginRes.status !== 200) {
            error(loginRes?.data.message);
        } else {
            console.log(loginRes?.data);
            setCookie("token", loginRes?.data.token, { path: "/" });
            await setTimeout(() => {
                setLogin(loginRes?.data.success);
            }, 1000);
        }
    };

    const onSignUpFailed = () => warning("submit failed!");

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
            className='h-[calc(100vh_-_64px_-_30px)] w-full bg-[url("/src/assets/background/bg_signup.jpg")] bg-cover'
        >
            {contextHolder}
            <Card
                title={
                    <Typography.Title level={2} className="pt-4">
                        Sign Up
                    </Typography.Title>
                }
                style={{ width: "50%", minWidth: 350 }}
                className="opacity-90"
            >
                <Flex vertical gap="large">
                    <Form
                        form={form}
                        name="signup"
                        className="signup-form"
                        initialValues={{ remember: true }}
                        onFinish={onSignUp}
                        onFinishFailed={onSignUpFailed}
                    >
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Name!",
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input placeholder="input username" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    type: "email",
                                    message: "The input is not valid E-mail!",
                                },
                                {
                                    required: true,
                                    message: "Please input your E-mail!",
                                },
                            ]}
                        >
                            <Input type="email" placeholder="input email" />
                        </Form.Item>
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
                            <Button
                                type="link"
                                size="small"
                                onClick={handleLoginClick}
                            >
                                Have an account?
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="w-full"
                            >
                                Sign Up
                            </Button>
                        </Form.Item>
                    </Form>
                </Flex>
            </Card>
        </Flex>
    );
};

export default SignUpPage;
