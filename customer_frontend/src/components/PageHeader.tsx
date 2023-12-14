import { Flex, Space, Dropdown, Input, Button, Typography } from "antd";
import type { MenuProps } from "antd";

import { useNavigate } from "react-router-dom";
import {
    BellOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    UserAddOutlined,
} from "@ant-design/icons";

const { Search } = Input;

export interface HeaderProps {
    login: boolean;
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const PageHeader = ({ login, setLogin }: HeaderProps) => {
    // TODO: find more graceful navigate way
    const navigate = useNavigate();

    // TODO: complete Props
    const onSearch = (value: string) => console.log(value);

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
        if (e.key == "/logout") {
            setLogin(false);
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
                <Flex>
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
