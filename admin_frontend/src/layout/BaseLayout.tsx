import { useState } from "react";
import { Layout } from "antd"
import PageHeader from "../components/PageHeader";
import Sidebar from "../components/Sidebar";
import PageFooter from "../components/PageFooter";
const { Header, Footer, Sider, Content } = Layout;
import { Route, Routes } from 'react-router-dom'
import { PageRoutes } from "../data/routes";
import ContentLayout from "./ContentLayout";
/*
const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: 'white',
};

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#108ee9',
};

const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: 'white',
};

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#7dbcea',
};
*/

const BaseLayout = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => setCollapsed(!collapsed)

    return (
        <Layout className="w-screen">
            <Header className="bg-white scoll-pl-6 leading-[64px] shadow-2xl drop-shadow-md">
                <PageHeader />
            </Header>
            <Layout hasSider>
                <Sider breakpoint="lg" collapsed={collapsed}>
                    <Sidebar toggleCollapsed={toggleCollapsed}/>
                </Sider>
                <Content className="min-h-screen max-h-fit ml-[16px] ">
                    <Routes>
                        {PageRoutes.map((route) => route.subMenuKey === '' ? 
                            <Route key={route.id} path={route.path} element={(
                                <ContentLayout 
                                    subMenuIcon={<></>} 
                                    subMenuName=""  
                                    currentIcon={route.icon} 
                                    currentName={route.name} 
                                    element={route.element}  
                                    description={route.description}
                                />
                            )}></Route> :
                            route.childMenu.map((childRoute) => (
                                <Route path={childRoute.path} element={(
                                    <ContentLayout 
                                        subMenuIcon={route.icon} 
                                        subMenuName={route.name} 
                                        currentIcon={<></>} 
                                        currentName={childRoute.name} 
                                        element={childRoute.element}  
                                        description={childRoute.description}
                                    />
                                )}></Route>
                            ))
                        )}
                    </Routes>
                </Content>
            </Layout>
            <Footer className="h-[30px] p-2 bg-gray-200">
                <PageFooter />
            </Footer>
        </Layout>
    )
}

export default BaseLayout