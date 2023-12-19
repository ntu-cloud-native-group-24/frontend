import { Layout } from "antd";

// admin
import AdminLayout from "./admin/AdminLayout";
import CustomerLayout from "./customer/CustomerLayout";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";
import CustomerPageFooter from "../components/customer/CustomerPageFooter";

import { useCookies } from "react-cookie";

import api from "../api/axiosClient";
import { userApi } from "../api/user";
import { UserType } from "../interfaces/UserInterface";

const { Header, Footer } = Layout;

const BaseLayout = () => {
    const [login, setLogin] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const [currentUser, setCurrentUser] = useState<UserType>({
        name: "",
        email: "",
        id: "",
        privileges: [],
    });

    useEffect(() => {
        const check = async () => {
            // console.log("cookie", cookies);
            // console.log("login", login);
            const user = localStorage.getItem("user");
            // if (user) {
            //     console.log("user: ", JSON.parse(user));
            // }

            if (cookies.token && (!login || !user)) {
                api.defaults.headers.common["x-api-key"] = cookies.token;
                const res = await userApi.getCurrentUser();
                console.log(res?.data);
                if (!res || res.status !== 200) {
                    setLogin(res?.data.success);
                    removeCookie("token");
                    localStorage.removeItem("user");
                    return;
                } else {
                    setLogin(res?.data.success);
                    setCurrentUser({ ...res?.data.user });
                    localStorage.setItem(
                        "user",
                        JSON.stringify({ ...res?.data.user })
                    );
                }

                // await get api/me
                // set axios default header with token
                // setLogin(true);
            }
            if (!login) {
                const { pathname } = location;
                // console.log(pathname);
                if (
                    ["/", "/login", "/signup", "/logout"].indexOf(pathname) ==
                    -1
                ) {
                    navigate("/");
                }
            }
        };
        check();
    }, [login, location, navigate]);

    return (
        <Layout className="w-full min-h-screen">
            <Header className="bg-white scroll-pl-6 p-2 leading-[64px] shadow-2xl drop-shadow-md top-0 sticky z-10">
                <PageHeader
                    login={login}
                    setLogin={setLogin}
                    currentUser={currentUser}
                />
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
