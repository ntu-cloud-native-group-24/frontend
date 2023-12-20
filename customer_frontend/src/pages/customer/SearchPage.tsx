import { Flex, Layout, Typography } from "antd";

import StoreDisplay from "../../components/customer/store/StoreDisplay";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { storeApi } from "../../api/store";
import { StoreType } from "../../interfaces/StoreInterface";

const { Content } = Layout;

const SearchPage = () => {
    // GET /api/store
    const location = useLocation();
    const [keyword, setKeyword] = useState("");
    const [keyTag, setKeyTag] = useState("");

    // const keyword = location.state.keyword;
    // const keyTag = location.state.keyTag;

    const [stores, setStores] = useState<StoreType[]>([]);

    useEffect(() => {
        const getAllStores = async () => {
            // get stores and store tags
            const storesRes = await storeApi.getAllStores();
            console.log(storesRes?.data);
            if (!storesRes || storesRes.status !== 200) {
                return;
            } else {
                const tmpStores = [];
                for (let i = 0; i < storesRes?.data.stores.length; i++) {
                    const storeTagsRes = await storeApi.getStoreTags(
                        storesRes?.data.stores[i].id
                    );

                    console.log(storeTagsRes?.data);

                    if (!storeTagsRes || storeTagsRes.status !== 200) {
                        return;
                    } else {
                        const tmpStore = {
                            ...storesRes?.data.stores[i],
                            tags: storeTagsRes?.data.tags,
                        };
                        tmpStores.push(tmpStore);
                    }
                }
                setStores(tmpStores);
            }
        };
        if (location.state) {
            setKeyword(location.state.keyword);
            setKeyTag(location.state.keyTag);
        }
        getAllStores();
    }, [location.state]);

    return (
        <Content className="bg-blue-300 max-h-full">
            <Flex vertical gap={0}>
                <div className="w-full bg-cover bg-[url('/src/assets/background/bg_home.jpg')]">
                    <Flex
                        className="h-full w-full text-white px-20 bg-black bg-opacity-50"
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
                                {keyword ? keyword : ""}
                                {keyTag ? keyTag : ""}
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
                    {stores
                        .filter((store) => {
                            if (keyword) {
                                const regex = new RegExp(
                                    keyword.split("").join(".*")
                                );
                                console.log(regex);
                                return store.name.match(regex);
                            } else if (keyTag) {
                                return store.tags.some(
                                    (tag) => tag.name === keyTag
                                );
                            }
                        })
                        .map((store) => {
                            console.log(stores);
                            return (
                                <StoreDisplay
                                    key={store.id}
                                    store={store}
                                    foods={[]}
                                />
                            );
                        })}
                </Flex>
            </Flex>
        </Content>
    );
};

export default SearchPage;
