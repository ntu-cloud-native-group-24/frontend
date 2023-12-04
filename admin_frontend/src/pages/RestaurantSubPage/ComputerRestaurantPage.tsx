import { useMemo, useState } from "react";
import { FilterType, RestaurantProps, SortType } from "../../interfaces/StoreInterface";
import { Layout, Typography, Badge } from "antd";
import RestaurantContent from "../../components/ComputerViews/RestaurantContent";
import FoodFilter from "../../components/ComputerViews/FoodFilter";
import { fallbackSRC } from "../../interfaces/FoodInterface";

const { Header, Sider, Content } = Layout;

const ComputerRestaurantPage = ({ store, foods } : RestaurantProps ) => {
    const [collapsed, setCollapsed] = useState(true);
    const [foodPicture, setFoodPicture] = useState(store.picture_url);
    
    const foodMaxPrice = useMemo(() => {
        return foods.reduce((prev, current) => (prev.price > current.price ? prev : current)).price;
    }, [foods])

    const tagsList = useMemo(() => {
        return foods.flatMap((food) => {
            return food.tags.map((tag) => tag)
        }).filter((v, i, arr) => arr.indexOf(v) === i);
    }, [foods])
    
    // TODO: danger zone -- Restaurant status
    const [searchValue, setSearchValue] = useState('');
    const [sortValue, setSortValue] = useState(SortType.NONE);
    const [priceRange, setPriceRange] = useState([0, foodMaxPrice + 1])
    const [filterArray, setFilterArray] = useState([FilterType.ONSTOCK, FilterType.SOLDOUT]);
    const [filterTags, setFilterTags] = useState(tagsList);
    
    const isInFilter = useMemo(() => {
        return !(searchValue === '' && sortValue === SortType.NONE)
    }, [searchValue, sortValue])

    const clearFilter = () => {
        setSearchValue('');
        setSortValue(SortType.NONE);
        setPriceRange([0, foodMaxPrice + 1])
        setFilterArray([FilterType.ONSTOCK, FilterType.SOLDOUT]);
        setFilterTags(tagsList);
    }

    const filterFoods = useMemo(() => {
        
        let result = [...foods]
        if( searchValue !== '' ) result = result.filter((food) => food.name.includes(searchValue))
        if( sortValue === SortType.POPULAR ){
            result = result.sort((foodA, foodB) => foodB.soldAmount - foodA.soldAmount)
        } else if( sortValue === SortType.RATING ){
            // TODO:
        }

        return result.filter((food) => {
            const foodStatus = food.status ? FilterType.ONSTOCK : FilterType.SOLDOUT;
            return ( 
                        (food.price >= priceRange[0] && food.price <= priceRange[1]) && 
                        (filterArray.findIndex((f) => f === foodStatus) !== -1) && 
                        (food.tags.filter(
                            (f) => filterTags.findIndex(
                                (ftag) => ftag === f
                            ) !== -1 ).length > 0
                        ) 
                    )
        });
    }, [foods, searchValue, sortValue, priceRange, filterArray, filterTags])

    return (
        <Layout className='w-full'>
            <Header className="p-0 h-[100px]">
                <img alt={store.name} src={foodPicture} onError={() => setFoodPicture(fallbackSRC)} />
            </Header>
            <Layout hasSider>
                <Content className="bg-white">
                    <div className="flex flex-col justify-center items-center">
                        <Typography.Title className="flex flex-row justify-center pt-4">{store.name}</Typography.Title>
                        <Badge status={store.status ? 'success' : 'default' } text={store.status ? 'OPENING' : 'CLOSE'} />
                    </div>
                    <RestaurantContent isInFilter={isInFilter} foods={filterFoods} tagsList={filterTags} />
                </Content>
                <Sider reverseArrow collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <FoodFilter collapsed={collapsed}
                                sortValue={sortValue}
                                foodMaxPrice={foodMaxPrice}
                                priceRange={priceRange}
                                filterArray={filterArray}
                                filterTags={filterTags}
                                fullTagsList={tagsList}
                                initStoreStatus={store.status}
                                initStoreTimes={[store.open_time, store.close_time]}
                                setSearchValue={setSearchValue}
                                setSortValue={setSortValue}
                                setPriceRange={setPriceRange}
                                setFilterArray={setFilterArray}
                                setFilterTags={setFilterTags}
                                clearFilter={clearFilter}
                    />
                </Sider>
            </Layout>
        </Layout>
    )
}

export default ComputerRestaurantPage;