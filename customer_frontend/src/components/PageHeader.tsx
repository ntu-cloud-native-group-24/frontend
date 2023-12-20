import { Flex, Space, Dropdown, Input, Button, Typography } from "antd";
import type { MenuProps } from "antd";

import { useNavigate } from "react-router-dom";
import {
    ShoppingCartOutlined,
    UserOutlined,
    UserAddOutlined,
} from "@ant-design/icons";

import { useCookies } from "react-cookie";
import api from "../api/axiosClient";
import { useEffect, useState } from "react";
import { UserType } from "../interfaces/UserInterface";

const { Search } = Input;

export interface HeaderProps {
    login: boolean;
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
    currentUser: UserType;
}

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
}

const PageHeader = ({ login, setLogin, currentUser }: HeaderProps) => {
    // TODO: find more graceful navigate way
    const { height, width } = useWindowDimensions();

    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);

    const onSearch = (value: string) => {
        console.log(value);
        if (value.trim() === "") {
            return;
        }
        navigate(`/search`, { state: { keyword: value } });
    };

    const handleHomeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log("click home", e);
        navigate("/");
    };

    // handle button before login
    const handleSignUpClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log("click Cart", e);
        navigate("/signup");
    };

    const handleLoginClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log("click Cart", e);
        navigate("/login");
    };

    // handle button after login
    const handleCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log("click Cart", e);
        navigate("/cart");
    };

    const handleMenuClick: MenuProps["onClick"] = (e) => {
        console.log("click", e);
        if (e.key == "/logout") {
            // clear user info in localStorage and cookies
            removeCookie("token");
            localStorage.removeItem("user");
            localStorage.removeItem("cart");
            api.defaults.headers.common["x-api-key"] = "";
            // set axios default page header false
            setLogin(false);
            // navigate to logout page
            navigate("/logout");
        }
        navigate(e.key as string);
    };

    const items: MenuProps["items"] = [
        {
            label: "Account",
            key: "/admin/setting/personal",
        },
        {
            label: "Orders",
            key: "/admin/order",
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
        <Flex wrap="wrap" className="h-full" justify="space-between">
            <Flex className="h-full">
                <Button
                    type="link"
                    onClick={handleHomeClick}
                    className="h-full"
                >
                    <Typography.Title
                        style={{ padding: 0, margin: 0, fontSize: 24 }}
                    >
                        Meal Order
                    </Typography.Title>
                </Button>
            </Flex>
            {login ? (
                <Flex align="center">
                    <Search
                        placeholder="input search text"
                        onSearch={onSearch}
                        style={width < 767 ? { width: 130 } : { width: 300 }}
                    />
                    <Button
                        icon={<ShoppingCartOutlined />}
                        onClick={handleCartClick}
                    >
                        {width < 767 ? "" : "Cart"}
                    </Button>
                    <Dropdown menu={menuProps}>
                        {width < 767 ? (
                            <Button icon={<UserOutlined />}></Button>
                        ) : (
                            <Button icon={<UserOutlined />}>
                                {width < 767 ? "" : currentUser.name}
                            </Button>
                        )}
                    </Dropdown>
                </Flex>
            ) : (
                <Flex>
                    <Flex gap={5} align="center" justify="space-between">
                        <Button
                            icon={<UserAddOutlined />}
                            onClick={handleSignUpClick}
                        >
                            Sign up
                        </Button>
                        <Button
                            icon={<UserOutlined />}
                            onClick={handleLoginClick}
                        >
                            Log in
                        </Button>
                    </Flex>
                </Flex>
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
