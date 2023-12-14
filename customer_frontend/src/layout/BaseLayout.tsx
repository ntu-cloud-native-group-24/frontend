import { Layout } from "antd";

// admin
import AdminLayout from "./admin/AdminLayout";
import CustomerLayout from "./customer/CustomerLayout";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";
import CustomerPageFooter from "../components/customer/CustomerPageFooter";

// import { apiMe } from "../data/api";

const { Header, Footer } = Layout;

const BaseLayout = () => {
    const [login, setLogin] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // TODO: checked if the user is already login...
        // TODO: find a better way to limit the routes

        // if !login -> check token exists or not
        // if token exists, do apiMe check
        // then setLogin

        if (!login) {
            const { pathname } = location;
            if (["/", "/login", "/signup", "/logout"].indexOf(pathname) == -1) {
                navigate("/");
            }
        }
    }, [login, location, navigate]);

    return (
        <Layout className="w-full min-h-screen">
            <Header className="bg-white scroll-pl-6 p-2 leading-[64px] shadow-2xl drop-shadow-md top-0 sticky z-10">
                <PageHeader login={login} setLogin={setLogin} />
            </Header>
            <Routes>
                <Route
                    path="/admin/*"
                    element={<AdminLayout login={login} />}
                />
                <Route
                    path="/*"
                    element={
                        <CustomerLayout login={login} setLogin={setLogin} />
                    }
                />
            </Routes>
            {location.pathname == "/" ? (
                <Footer className="bg-[#43464E]">
                    <CustomerPageFooter />
                </Footer>
            ) : (
                <Footer className="h-[30px] p-2 bg-gray-200">
                    <PageFooter />
                </Footer>
            )}
        </Layout>
    );
};

export default BaseLayout;
