import {
    DatabaseOutlined,
    ToolOutlined,
    QuestionCircleOutlined,
    HomeOutlined,
} from "@ant-design/icons";

// import Homepage from "../../pages/admin/Homepage";
import HelperPage from "../../pages/admin/HelperPage";
import FoodOrder from "../../pages/admin/FoodOrder/FoodOrderPage";
import PersonalSettings from "../../pages/admin/Settings/PersonalSettingsPage";
import PasswordSettings from "../../pages/admin/Settings/PasswordSettingsPage";
import HomePage from "../../pages/admin/HomePage";

export const PageRoutes = [
    {
        id: 1,
        path: "/",
        element: <HomePage />,
        key: "homepage",
        name: "主頁",
        icon: <HomeOutlined />,
        subMenuKey: "",
        childMenu: [],
        description: "查看統計數據",
    },
    {
        id: 2,
        path: "/order",
        element: <FoodOrder />,
        key: "order",
        name: "訂單管理",
        icon: <DatabaseOutlined />,
        subMenuKey: "",
        childMenu: [],
        description: "訂單管理",
    },
    {
        id: 3,
        path: "/setting",
        element: <></>,
        key: "setting",
        name: "編輯資料",
        icon: <ToolOutlined />,
        subMenuKey: "sub2",
        childMenu: [
            {
                id: 4,
                path: "/setting/personal",
                element: <PersonalSettings />,
                key: "personalSetting",
                name: "個人資料",
                icon: <></>,
                subMenuKey: "",
                childMenu: [],
                description: "檢視及編輯個人資料",
            },
            {
                id: 5,
                path: "/setting/changepassword",
                element: <PasswordSettings />,
                key: "passwordSetting",
                name: "更改密碼",
                icon: <></>,
                subMenuKey: "",
                childMenu: [],
                description: "更改密碼",
            },
        ],
        description: "",
    },
    {
        id: 6,
        path: "/help",
        element: <HelperPage />,
        key: "helpCenter",
        name: "幫助中心",
        icon: <QuestionCircleOutlined />,
        subMenuKey: "",
        childMenu: [],
        description: "檢視常見疑問及資訊",
    },
];
