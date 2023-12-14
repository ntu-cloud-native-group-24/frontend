import { Flex, Layout, Typography } from "antd";

import StoreDisplay from "../../components/customer/store/StoreDisplay";

const { Content } = Layout;

const SearchPage = () => {
    // GET /api/store

    const dummyStore = {
        name: "ML Pasta",
        picture_url:
            "https://png.pngtree.com/back_origin_pic/05/05/68/52e6ab3fde77ad0a01b5d03c03e982f8.jpg",
        open_time: new Date("08:00 AM"),
        close_time: new Date("08:00 PM"),
        status: true,
        day: 27,
    };

    return (
        <Content className="bg-blue-300 max-h-full">
            <Flex vertical gap={0}>
                <div className="w-full bg-cover bg-[url('/src/assets/background/bg_home.jpg')]">
                    <Flex
                        className="h-full w-full text-white pl-32 bg-black bg-opacity-50"
                        align="center"
                    >
                        <Flex vertical className="py-10">
                            <Typography.Title
                                style={{
                                    color: "white",
                                    fontSize: 48,
                                    margin: 0,
                                    padding: 0,
                                }}
                            >
                                Search Store
                            </Typography.Title>
                        </Flex>
                    </Flex>
                </div>

                <Flex
                    wrap="wrap"
                    className="grid 2xl:grid-cols-6 xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2"
                    gap="small"
                >
                    {/* iterative store */}
                    <StoreDisplay store={dummyStore} foods={[]} />
                    <StoreDisplay store={dummyStore} foods={[]} />
                    <StoreDisplay store={dummyStore} foods={[]} />
                    <StoreDisplay store={dummyStore} foods={[]} />
                </Flex>
            </Flex>
        </Content>
    );
};

export default SearchPage;
