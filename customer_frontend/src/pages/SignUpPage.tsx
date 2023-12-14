import { Button, Card, Flex, Input, Space, Typography, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { apiRegister } from "../data/api";

export interface SignUpProps {
    login: boolean;
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUpPage = ({ login, setLogin }: SignUpProps) => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [messageApi, contextHolder] = message.useMessage();

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
        // console.log(name, username, password);
        const registerData = {
            name: name,
            email: email,
            username: username,
            password: password,
        };
        console.log(registerData);

        if (username.trim().length === 0 || password.trim().length === 0) {
            warning("Please input username or password!");
            return;
        }
        // TODO: Backend here
        // CORS
        // await apiRegister(registerData).then((response) => {
        //     console.log(response);
        // }).error((err) => { error(err) });

        const result = true;
        if (!result) {
            error("Sign up Fail!");
        } else {
            setLogin(true);
            success("Sign up Success!");
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
            className='h-[calc(100vh_-_64px_-_30px)] w-full bg-[url("/src/assets/background/bg_signup.jpg")] bg-cover'
        >
            {contextHolder}
            <Card
                title={
                    <Typography.Title level={2} className="pt-4">
                        Sign Up
                    </Typography.Title>
                }
                style={{ width: 450 }}
                className="opacity-90"
            >
                <Flex vertical gap="large">
                    <Flex vertical gap="middle">
                        <Input
                            placeholder="input name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            placeholder="input email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
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
                    <Space>
                        <Button
                            type="link"
                            size="small"
                            onClick={handleLoginClick}
                        >
                            Have an account?
                        </Button>
                    </Space>
                    <Button type="primary" onClick={onSignUp}>
                        Sign Up
                    </Button>
                </Flex>
            </Card>
        </Flex>
    );
};

export default SignUpPage;
