import { Button, Card, Flex, Input, Typography, message, Form } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useCookies } from "react-cookie";

import { userApi } from "../api/user";

export interface loginProps {
    login: boolean;
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginPage = ({ login, setLogin }: loginProps) => {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [cookies, setCookie] = useCookies(["token"]);

    const [form] = Form.useForm<{
        username: string;
        password: string;
    }>();

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

    const onLogin = async () => {
        console.log(form.getFieldsValue());
        // console.log(loginData);
        const { username, password } = form.getFieldsValue();

        const res = await userApi.login(username, password);
        if (!res || res.status !== 200) {
            error(res?.data.message);
        } else {
            console.log(res?.data);
            success(res?.data.message);
            setCookie("token", res?.data.token, { path: "/" });
            await setTimeout(() => {
                setLogin(res?.data.success);
            }, 1000);
        }
    };

    const onLoginFailed = () => warning("submit failed!");

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
                        form={form}
                        name="login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onLogin}
                        onFinishFailed={onLoginFailed}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Username!",
                                    whitespace: true,
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
                                    whitespace: true,
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
                                {/* <Button type="link" size="small">
                                    Forget password?
                                </Button> */}
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
                </Flex>
            </Card>
        </Flex>
    );
};

export default LoginPage;
