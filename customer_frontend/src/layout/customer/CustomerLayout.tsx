import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";

import HomePage from "../../pages/customer/HomePage";

import LoginPage from "../../pages/LoginPage";
import SignUpPage from "../../pages/SignUpPage";

import SearchPage from "../../pages/customer/SearchPage";
import StorePage from "../../pages/customer/store/StorePage";
import ProductPage from "../../pages/customer/store/product/ProductPage";

import CartPage from "../../pages/customer/CartPage";
import PaymentPage from "../../pages/customer/PaymentPage";

import LogoutPage from "../../pages/LogoutPage";
import ErrorPage from "../../pages/ErrorPage";

export interface CustomerProps {
    login: boolean;
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomerLayout = ({ login, setLogin }: CustomerProps) => {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<HomePage login={login} />} />
                <Route
                    path="/login"
                    element={<LoginPage login={login} setLogin={setLogin} />}
                />
                <Route
                    path="/signup"
                    element={<SignUpPage login={login} setLogin={setLogin} />}
                />
                <Route path="/search" element={<SearchPage />} />

                <Route path="/store/:id" element={<StorePage />} />
                <Route path="/store/:id/:productID" element={<ProductPage />} />

                <Route path="/cart" element={<CartPage />} />
                <Route path="/payment" element={<PaymentPage />} />

                <Route path="/logout" element={<LogoutPage />} />
                <Route path="/*" element={<ErrorPage />} />
            </Routes>
        </Layout>
    );
};

export default CustomerLayout;
