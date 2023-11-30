import { Layout } from "antd";
import AdminLayout from "./admin/AdminLayout";
import LogoutLayout from "./LogoutLayout";
import ErrorPage from "../pages/ErrorPage";

import { Route, Routes } from "react-router-dom";

import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";

const { Header, Footer } = Layout;

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
    return (
        <Layout className="w-100 h-screen">
            <Header className="bg-white scroll-pl-6 leading-[64px] shadow-2xl drop-shadow-md">
                <PageHeader />
            </Header>
            <Routes>
                <Route path="/admin/*" element={<AdminLayout />} />
                <Route path="/logout" element={<LogoutLayout />} />
                <Route path="/*" element={<ErrorPage />} />
            </Routes>
            <Footer className="h-[30px] p-2 bg-gray-200">
                <PageFooter />
            </Footer>
        </Layout>
    );
};

export default BaseLayout;
