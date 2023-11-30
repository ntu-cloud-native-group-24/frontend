import React, { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { NodeCollapseOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { PageRoutes } from "../data/admin/adminRoutes";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuItem[] = [
    ...PageRoutes.map((route) => {
        if (route.subMenuKey === "") {
            return getItem(route.name, route.key, route.icon);
        } else {
            return getItem(
                route.name,
                route.subMenuKey,
                route.icon,
                route.childMenu.map((childRoute) => {
                    return getItem(childRoute.name, childRoute.key);
                })
            );
        }
    }),
    getItem("摺疊控制板", "collapse", <NodeCollapseOutlined />),
];

const mapPath = PageRoutes.flatMap((route) => {
    if (route.subMenuKey === "") {
        return { key: route.key, path: route.path };
    } else {
        return [
            ...route.childMenu.map((childRoute) => {
                return { key: childRoute.key, path: childRoute.path };
            }),
        ];
    }
});

export interface SidebarProps {
    toggleCollapsed: () => void;
}

const Sidebar = ({ toggleCollapsed }: SidebarProps) => {
    //const [theme, setTheme] = useState<MenuTheme>('dark');
    const [current, setCurrent] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const toPath = mapPath.find(
            (route) => route.path === location.pathname
        );
        if (toPath !== undefined) setCurrent(toPath.key);
    }, [location.pathname]);

    const onClick: MenuProps["onClick"] = (e) => {
        if (e.key === "collapse") {
            toggleCollapsed();
        } else {
            setCurrent(e.key);
            const toPath = mapPath.find((route) => route.key === e.key);
            if (toPath !== undefined) navigate("/admin" + toPath.path);
        }
    };

    return (
        <>
            <Menu
                theme="dark"
                onClick={onClick}
                defaultOpenKeys={[]}
                selectedKeys={[current]}
                mode="inline"
                items={items}
            />
        </>
    );
};

export default Sidebar;
