import { Layout } from "antd";

import CustomerLayout from "./customer/CustomerLayout";

// admin
import AdminLayout from "./admin/AdminLayout";

import { Route, Routes } from "react-router-dom";

import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";

const { Header, Footer } = Layout;

const BaseLayout = () => {
    return (
        <Layout className="w-100 h-screen">
            <Header className="bg-white scroll-pl-6 leading-[64px] shadow-2xl drop-shadow-md">
                <PageHeader />
            </Header>
            <Routes>
                <Route path="/admin/*" element={<AdminLayout />} />
                <Route path="/*" element={<CustomerLayout />} />
            </Routes>
            <Footer className="h-[30px] p-2 bg-gray-200">
                <PageFooter />
            </Footer>
        </Layout>
    );
};

export default BaseLayout;
