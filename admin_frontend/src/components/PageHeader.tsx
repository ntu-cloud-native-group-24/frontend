import { Flex, Space, Dropdown } from "antd";
import type { MenuProps } from 'antd';
import { MenuOutlined, BellOutlined, NotificationOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

export interface HeaderProps {
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const PageHeader = ({ setLogin } : HeaderProps) => {

    const navigate = useNavigate()

    const handleButtonClick = () => {
        // TODO: backend logout
        setLogin(false);
        navigate('/logout')
    };
    
    const handleMenuClick: MenuProps['onClick'] = (e) => {
        console.log('click', e);
    };
    
    const items: MenuProps['items'] = [
        {
            label: '客服中心',
            key: '1',
            icon: <BellOutlined />,
        },
        {
            label: '檢視通知',
            key: '2',
            icon: <NotificationOutlined />,
        },
    ];
    
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (
        <Flex align="center" justify='space-between'>
            <Space>
                <p className="text-xl">Meal Order</p>
                <p className="text-md text-gray-400">For partner</p>
            </Space>
            <Space>
                <Dropdown.Button menu={menuProps} onClick={handleButtonClick} icon={<MenuOutlined />}>
                    登出
                </Dropdown.Button>
            </Space>
        </Flex>
    )
}

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