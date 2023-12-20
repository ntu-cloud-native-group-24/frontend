import { useState, useEffect } from "react";
import { Layout } from "antd";
import Sidebar from "../../components/admin/Sidebar";
const { Sider, Content } = Layout;
import { Route, Routes, useNavigate } from "react-router-dom";
import { PageRoutes } from "../../data/admin/adminRoutes";
import ContentLayout from "./ContentLayout";
import ErrorPage from "../../pages/ErrorPage";

export interface AdminProps {
    login: boolean;
}

const AdminLayout = ({ login }: AdminProps) => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    const user = localStorage.getItem("user");

    const toggleCollapsed = () => setCollapsed(!collapsed);

    useEffect(() => {
        if (!login && !user) {
            navigate("/");
        }
    }, [login, user, navigate]);

    return (
        <Layout hasSider>
            <Sider breakpoint="lg" collapsed={collapsed}>
                <Sidebar toggleCollapsed={toggleCollapsed} />
            </Sider>
            <Content className="max-h-fit ml-[16px] ">
                <Routes>
                    {PageRoutes.map((route) =>
                        route.subMenuKey === "" ? (
                            <Route
                                key={route.id}
                                path={route.path}
                                element={
                                    <ContentLayout
                                        subMenuIcon={<></>}
                                        subMenuName=""
                                        currentIcon={route.icon}
                                        currentName={route.name}
                                        element={route.element}
                                        description={route.description}
                                    />
                                }
                            ></Route>
                        ) : (
                            route.childMenu.map((childRoute) => (
                                <Route
                                    path={childRoute.path}
                                    element={
                                        <ContentLayout
                                            subMenuIcon={route.icon}
                                            subMenuName={route.name}
                                            currentIcon={<></>}
                                            currentName={childRoute.name}
                                            element={childRoute.element}
                                            description={childRoute.description}
                                        />
                                    }
                                ></Route>
                            ))
                        )
                    )}
                    <Route path="*" element={<ErrorPage />}></Route>
                </Routes>
            </Content>
        </Layout>
    );
};

export default AdminLayout;
