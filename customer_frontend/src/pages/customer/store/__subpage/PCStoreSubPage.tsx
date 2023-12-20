import { useMemo, useState } from "react";
import { FilterType, StoreProps } from "../../../../interfaces/StoreInterface";
import { Layout, Typography, Badge, Flex } from "antd";
import StoreContent from "../../../../components/customer/store/StoreContent";
import FoodFilter from "../../../../components/customer/store/FoodFilter";
import { fallbackSRC } from "../../../../interfaces/FoodInterface";

const { Header, Sider, Content } = Layout;

const PCStoreSubPage = ({ store, foods }: StoreProps) => {
    const [collapsed, setCollapsed] = useState(true);
    const [storePicture, setStorePicture] = useState(store.picture_url);

    console.log("sub", store);

    const foodMaxPrice = useMemo(() => {
        return foods.reduce((prev, current) =>
            prev.price > current.price ? prev : current
        ).price;
    }, [foods]);

    const categoriesList = useMemo(() => {
        return foods
            .flatMap((food) => {
                return food.categories.map((category) => category);
            })
            .filter((v, i, arr) => arr.indexOf(v) === i);
    }, [foods]);

    const [searchValue, setSearchValue] = useState("");
    // const [sortValue, setSortValue] = useState(SortType.NONE);
    const [priceRange, setPriceRange] = useState([0, foodMaxPrice + 1]);
    const [filterArray, setFilterArray] = useState([
        FilterType.ONSTOCK,
        FilterType.SOLDOUT,
    ]);
    const [filterCategories, setFilterCategories] = useState(categoriesList);

    const isInFilter = useMemo(() => {
        return !(searchValue === "");
    }, [searchValue]);

    const clearFilter = () => {
        setSearchValue("");
        // setSortValue(SortType.NONE);
        setPriceRange([0, foodMaxPrice + 1]);
        setFilterArray([FilterType.ONSTOCK, FilterType.SOLDOUT]);
        setFilterCategories(categoriesList);
    };

    const filterFoods = useMemo(() => {
        let result = [...foods];
        if (searchValue !== "")
            result = result.filter((food) => food.name.includes(searchValue));

        return result.filter((food) => {
            const foodStatus = food.is_available
                ? FilterType.ONSTOCK
                : FilterType.SOLDOUT;
            return (
                food.price >= priceRange[0] &&
                food.price <= priceRange[1] &&
                filterArray.findIndex((f) => f === foodStatus) !== -1 &&
                food.categories.filter(
                    (f) =>
                        filterCategories.findIndex(
                            (fcategory) => fcategory === f
                        ) !== -1
                ).length > 0
            );
        });
    }, [foods, searchValue, priceRange, filterArray, filterCategories]);

    return (
        <Layout className="w-full">
            <Header className="p-0 h-[100px]">
                <img
                    alt={store.name}
                    src={storePicture}
                    onError={() => setStorePicture(fallbackSRC)}
                    className="object-none h-full w-full"
                />
            </Header>
            <Layout hasSider>
                <Content className="bg-white p-8">
                    <Flex justify="center" align="center" vertical>
                        <Typography.Title className="p-3" style={{ margin: 0 }}>
                            {store.name}
                        </Typography.Title>
                        <Typography.Paragraph>
                            {store.description}
                        </Typography.Paragraph>
                        <Flex gap="large">
                            <Typography.Text>
                                地址：{store.address}
                            </Typography.Text>
                            <Typography.Text>
                                電話：{store.phone}
                            </Typography.Text>
                        </Flex>
                        <Badge
                            status={store.status ? "success" : "default"}
                            text={store.status ? "OPENING" : "CLOSE"}
                        />
                    </Flex>
                    <StoreContent
                        isInFilter={isInFilter}
                        foods={filterFoods}
                        categoriesList={filterCategories}
                        store={store}
                    />
                </Content>
                <Sider
                    reverseArrow
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                    collapsedWidth={0}
                    width={300}
                    zeroWidthTriggerStyle={{
                        position: "fixed",
                        left: collapsed
                            ? "calc(100% - 50px)"
                            : "calc(100% - 276px)",
                        top: "calc(100% - 50px)",
                        borderRadius: "50%",
                        transition: "all 0.1s ease-out",
                    }}
                >
                    <FoodFilter
                        collapsed={collapsed}
                        // sortValue={sortValue}
                        foodMaxPrice={foodMaxPrice}
                        priceRange={priceRange}
                        filterArray={filterArray}
                        filterCategories={filterCategories}
                        fullCategoriesList={categoriesList}
                        initStoreStatus={store.status}
                        initStoreTimes={store.hours}
                        setSearchValue={setSearchValue}
                        // setSortValue={setSortValue}
                        setPriceRange={setPriceRange}
                        setFilterArray={setFilterArray}
                        setFilterCategories={setFilterCategories}
                        clearFilter={clearFilter}
                    />
                </Sider>
            </Layout>
        </Layout>
    );
};

export default PCStoreSubPage;
