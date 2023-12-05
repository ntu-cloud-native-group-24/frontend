import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";

import HomePage from "../../pages/customer/HomePage";

import LoginPage from "../../pages/customer/LoginPage";
import RegisterPage from "../../pages/customer/RegisterPage";

import SearchPage from "../../pages/customer/SearchPage";
import StorePage from "../../pages/customer/store/StorePage";
import ProductPage from "../../pages/customer/store/product/ProductPage";

import CartPage from "../../pages/customer/CartPage";
import PaymentPage from "../../pages/customer/PaymentPage";

import LogoutPage from "../../pages/LogoutPage";
import ErrorPage from "../../pages/ErrorPage";

const CustomerLayout = () => {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route path="/search" element={<SearchPage />} />
                <Route path="/store/:id" element={<StorePage />} />
                <Route path="/store/:id/:product" element={<ProductPage />} />

                <Route path="/cart" element={<CartPage />} />
                <Route path="/payment" element={<PaymentPage />} />

                <Route path="/logout" element={<LogoutPage />} />
                <Route path="/*" element={<ErrorPage />} />
            </Routes>
        </Layout>
    );
};

export default CustomerLayout;
