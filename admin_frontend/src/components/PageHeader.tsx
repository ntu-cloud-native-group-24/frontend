import { Flex, Space, Dropdown, Button, Drawer, Menu } from "antd";
import type { MenuProps } from 'antd';
import { MenuOutlined, MenuUnfoldOutlined, BellOutlined, NotificationOutlined, RollbackOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from "react-router-dom";
import { setToken } from "../api/axiosUtility";
import useWindowDimensions from "../utilities/windows";
import { useState, useEffect } from "react";
import { PageRoutes } from '../data/routes';
export interface HeaderProps {
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const itemsMenu: MenuItem[] = PageRoutes.map((route) => {
    if( route.subMenuKey === '' ){
        return getItem(route.name, route.key, route.icon)
    } else {
        return getItem(route.name, route.subMenuKey, route.icon, route.childMenu.map((childRoute) => {
            return getItem(childRoute.name, childRoute.key)
        }))
    }
})

const mapPath = PageRoutes.flatMap((route) => {
    if( route.subMenuKey === '' ){
        return { key: route.key, path: route.path }
    } else {
        return [...route.childMenu.map((childRoute) => { 
            return { key: childRoute.key, path: childRoute.path }
        })]
    }
})

const PageHeader = ({ setLogin } : HeaderProps) => {

    const navigate = useNavigate()
    const location = useLocation();
    const { height, width } = useWindowDimensions();
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState('');

    const handleButtonClick = () => {
        localStorage.removeItem('token');
        setToken('');
        setLogin(false);
        navigate('/logout')
    };
    
    const handleMenuClick: MenuProps['onClick'] = (e) => {
        console.log('click', e);
        console.log(height);
        if( e.key === '0' ){
            localStorage.removeItem('storeId');
            window.location.href = '/store';
        }
    };
    
    const items: MenuProps['items'] = [
        {
            label: '返回商店選項',
            key: '0',
            icon: <RollbackOutlined />,
        },
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

    useEffect(() => {
        const toPath = mapPath.find((route) => route.path === location.pathname);
        if( toPath !== undefined ) setCurrent(toPath.key)
    }, [location.pathname])

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
        const toPath = mapPath.find((route) => route.key === e.key)
        if( toPath !== undefined ) navigate(toPath.path)
    }

    return (
        <Flex align="center" justify='space-between'>
            {
                width <= 844 ? (
                    <Flex align='center' justify="center" gap={20}>
                        <Button size="small" type="text" icon={<MenuUnfoldOutlined />} onClick={() => setOpen(true)}/>
                        <p className="text-md">Meal Order</p>
                        <Drawer
                            title="Menu"
                            placement="left"
                            closable={true}
                            onClose={() => setOpen(false)}
                            open={open}
                            styles={{
                                body: {
                                    padding: 0
                                }
                            }}
                        >
                            <Menu
                                theme="dark"
                                onClick={onClick}
                                defaultOpenKeys={[]}
                                selectedKeys={[current]}
                                mode="inline"
                                items={itemsMenu}
                                className="w-full h-full"
                            />
                        </Drawer>
                    </Flex>
                ) : (
                    <Space>
                        <p className="text-xl">Meal Order</p>
                        <p className="text-md text-gray-400">For partner</p>
                    </Space>
                )
            }
            <Space>
                <Dropdown.Button size={width <= 844 ? "small" : "middle"} menu={menuProps} onClick={handleButtonClick} icon={<MenuOutlined />}>
                    登出
                </Dropdown.Button>
            </Space>
        </Flex>
    )
}

export default PageHeader;
