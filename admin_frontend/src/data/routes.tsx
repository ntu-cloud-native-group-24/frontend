import FoodManagement from "../pages/FoodManagement";
import PastFoodOrder from "../pages/FoodOrder/PastFoodOrder";
import TodayFoodOrder from "../pages/FoodOrder/TodayFoodOrder";
import HelperPage from "../pages/HelperPage";
import Homepage from "../pages/Homepage";
//import NotificationPage from "../pages/NotificationPage";
import RestaurantPage from "../pages/RestaurantPage";
import MoneySettings from "../pages/Settings/MoneySettings";
import RestaurantSettings from "../pages/Settings/RestaurantSettings";
import { ShopOutlined,
    PlusOutlined,
    DatabaseOutlined, 
    ToolOutlined,
    //NotificationOutlined,
    QuestionCircleOutlined,
    HomeOutlined,
} from '@ant-design/icons';
import UserSettings from "../pages/Settings/UserSettings";
import WorkTimeSettings from "../pages/Settings/WorkTimeSettings";

export const PageRoutes = [
    {
        id: 1,
        path: "/",
        element: <Homepage />,
        key: 'homepage',
        name: '主頁',
        icon: <HomeOutlined />,
        subMenuKey: '',
        childMenu: [],
        description: '查看統計數據',
    }, 
    {
        id: 2,
        path: "/restaurant",
        element: <RestaurantPage />,
        key: 'restaurantManagement',
        name: '餐廳管理',
        icon: <ShopOutlined />,
        subMenuKey: '',
        childMenu: [],
        description: '檢視及編輯餐廳頁面',
    },
    {
        id: 3,
        path: "/food",
        element: <FoodManagement />,
        key: 'foodManagement',
        name: '餐點管理',
        icon: <PlusOutlined />,
        subMenuKey: '',
        childMenu: [],
        description: '檢視及編輯餐點',
    },
    {
        id: 4,
        path: '/order',
        element: <></>,
        key: 'order',
        name: '訂單管理',
        icon: <DatabaseOutlined />,
        subMenuKey: 'sub1',
        childMenu: [
            {
                id: 5,
                path: "/order/today",
                element: <TodayFoodOrder />,
                key: 'todayOrder',
                name: '今日訂單管理',
                icon: <></>,
                subMenuKey: '',
                childMenu: [],
                description: '檢視今日訂單',
            },
            /*
            {
                id: 6,
                path: "/order/future",
                element: <FutureFoodOrder />,
                key: 'futureOrder',
                name: '未來訂單管理',
                icon: <></>,
                subMenuKey: '',
                childMenu: [],
                description: '檢視未來訂單',
            },
            */
            {
                id: 7,
                path: "/order/past",
                element: <PastFoodOrder />,
                key: 'pastOrder',
                name: '過去訂單管理',
                icon: <></>,
                subMenuKey: '',
                childMenu: [],
                description: '檢視過去訂單',
            },
        ],
        description: '',
    },
    {
        id: 8,
        path: "/setting",
        element: <></>,
        key: 'setting',
        name: '編輯資料',
        icon: <ToolOutlined />,
        subMenuKey: 'sub2',
        childMenu: [
            {
                id: 12,
                path: '/setting/user',
                element: <UserSettings />,
                key: 'userSetting',
                name: '使用者資料管理',
                icon: <></>  ,
                subMenuKey: '',
                childMenu: [],
                description: '檢視及編輯使用者資料'
            },
            {
                id: 9,
                path: "/setting/restaurant",
                element: <RestaurantSettings />,
                key: 'restaurantSetting',
                name: '餐廳資料管理',
                icon: <></>,
                subMenuKey: '',
                childMenu: [],
                description: '檢視及編輯餐廳資料',
            },
            {
                id: 13,
                path: "/setting/worktime",
                element: <WorkTimeSettings />,
                key: 'timeSetting',
                name: '餐廳營業時間管理',
                icon: <></>,
                subMenuKey: '',
                childMenu: [],
                description: '檢視及編輯餐廳營業時間',
            },
            {
                id: 10,
                path: "/setting/money",
                element: <MoneySettings />,
                key: 'moneySetting',
                name: '金流及帳務資料管理',
                icon: <></>,
                subMenuKey: '',
                childMenu: [],
                description: '檢視及編輯帳務資料',
            },
        ],
        description: '',
    },
    /*
    {
        id: 11,
        path: "/notification",
        element: <NotificationPage />,
        key: 'notification',
        name: '通知頁面',
        icon: <NotificationOutlined />,
        subMenuKey: '',
        childMenu: [],
        description: '檢視訂單通知',
    },
    */
    {
        id: 12,
        path: "/help",
        element: <HelperPage />,
        key: 'helpCenter',
        name: '幫助中心',
        icon: <QuestionCircleOutlined />,
        subMenuKey: '',
        childMenu: [],
        description: '檢視常見疑問及資訊',
    },
];