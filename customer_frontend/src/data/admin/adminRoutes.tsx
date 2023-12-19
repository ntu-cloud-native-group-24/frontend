import {
    DatabaseOutlined,
    ToolOutlined,
    NotificationOutlined,
    QuestionCircleOutlined,
    HomeOutlined,
} from "@ant-design/icons";

import Homepage from "../../pages/admin/Homepage";
import HelperPage from "../../pages/admin/HelperPage";

import FoodOrder from "../../pages/admin/FoodOrder/FoodOrderPage";
// import PendingFoodOrder from "../../pages/admin/FoodOrder/PendingFoodOrder";
// import PreparedFoodOrder from "../../pages/admin/FoodOrder/PreparedFoodOrder";
// import DoneFoodOrder from "../../pages/admin/FoodOrder/DoneFoodOrder";
// import CanceledFoodOrder from "../../pages/admin/FoodOrder/CanceledFoodOrder";

// childMenu: [
//     {
//         id: 3,
//         path: "/order/pending",
//         element: <PendingFoodOrder />,
//         key: "pendingOrder",
//         name: "待接受的訂單",
//         icon: <></>,
//         subMenuKey: "",
//         childMenu: [],
//         description: "檢視待接受的訂單",
//     },
//     {
//         id: 4,
//         path: "/order/prepared",
//         element: <PreparedFoodOrder />,
//         key: "preparedOrder",
//         name: "準備中的訂單",
//         icon: <></>,
//         subMenuKey: "",
//         childMenu: [],
//         description: "檢視準備中的訂單",
//     },
//     {
//         id: 5,
//         path: "/order/done",
//         element: <DoneFoodOrder />,
//         key: "doneOrder",
//         name: "完成的訂單",
//         icon: <></>,
//         subMenuKey: "",
//         childMenu: [],
//         description: "檢視完成的訂單",
//     },
//     {
//         id: 6,
//         path: "/order/canceled",
//         element: <CanceledFoodOrder />,
//         key: "canceledOrder",
//         name: "取消的訂單",
//         icon: <></>,
//         subMenuKey: "",
//         childMenu: [],
//         description: "檢視取消的訂單",
//     },
// ],

import PersonalSettings from "../../pages/admin/Settings/PersonalSettingsPage";
import PasswordSettings from "../../pages/admin/Settings/PasswordSettingsPage";

export const PageRoutes = [
    {
        id: 1,
        path: "/",
        element: <Homepage />,
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
