import { Flex, Space, Dropdown, Input, Button } from "antd";
import type { MenuProps } from "antd";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    BellOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    UserAddOutlined,
} from "@ant-design/icons";

import axios from "axios";

const { Search } = Input;

export interface HeaderProps {
    username: string;
}

const PageHeader = () => {
    // TODO: find more graceful navigate way
    const navigate = useNavigate();

    // TODO: complete Props
    const onSearch = (value: string) => console.log(value);

    // TODO: user login token
    // const token = undefined;
    const token = "y";

    // name: "abcdefg"
    // username: "abcdefgabcdefg"
    // password: "abcdefgabcdefg"

    // TODO: get user info save in cookies or session
    // using @fastify/cors to get access to backend api
    // add following code in app.ts
    // await app.register(require('@fastify/cors'), {})
    useEffect(() => {
        axios
            .post("http://127.0.0.1:3000/api/login", {
                username: "abcdefgabcdefg",
                password: "abcdefgabcdefg",
            })
            .then((response) => {
                console.log(response);
            });
    }, []);

    // handle button before login
    const handleRegisterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log("click Cart", e);
        navigate("/register");
    };

    const handleLoginClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log("click Cart", e);
        navigate("/login");
    };

    // handle button after login
    const handleNotificationClick = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        console.log("click Notification", e);
        navigate("/admin/notification");
    };

    const handleCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log("click Cart", e);
        navigate("/cart");
    };

    const handleMenuClick: MenuProps["onClick"] = (e) => {
        console.log("click", e);
        navigate(e.key as string);
    };

    const items: MenuProps["items"] = [
        {
            label: "Account",
            key: "/admin/setting/personal",
        },
        {
            label: "Orders",
            key: "/admin/order/pending",
        },
        {
            label: "Log out",
            key: "/logout",
        },
    ];

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (
        <Flex align="center" justify="space-between">
            <Space>
                <p className="text-xl">Meal Order</p>
            </Space>
            {token ? (
                <Space>
                    <Space.Compact>
                        <Search
                            placeholder="input search text"
                            onSearch={onSearch}
                        />
                    </Space.Compact>
                    <Button
                        icon={<BellOutlined />}
                        onClick={handleNotificationClick}
                    >
                        Notification
                    </Button>
                    <Button
                        icon={<ShoppingCartOutlined />}
                        onClick={handleCartClick}
                    >
                        Cart
                    </Button>
                    <Dropdown menu={menuProps}>
                        <Button icon={<UserOutlined />}>Ruby</Button>
                    </Dropdown>
                </Space>
            ) : (
                <Space>
                    <Button
                        icon={<UserAddOutlined />}
                        onClick={handleRegisterClick}
                    >
                        Register
                    </Button>
                    <Button icon={<UserOutlined />} onClick={handleLoginClick}>
                        Login
                    </Button>
                </Space>
            )}
        </Flex>
    );
};

export default PageHeader;

/*
<Flex align="center" justify='space-between'>
    <Space>
        <Title className='h-full relative top-1' level={4}>Meal Order</Title>
        <Text className='text-gray-400'>For partner</Text>
    </Space>
    <Flex wrap="wrap" gap="middle" align="center" justify='center'>
        <Text className="text-gray-400">Welcome back! {username}</Text>
        <Dropdown.Button className="max-w-[80px]" menu={menuProps} onClick={handleButtonClick} icon={<MenuOutlined />}>
            登出
        </Dropdown.Button>
    </Flex>
</Flex>
*/
