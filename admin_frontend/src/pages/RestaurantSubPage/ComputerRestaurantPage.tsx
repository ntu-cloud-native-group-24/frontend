import { useCallback, useEffect, useMemo, useState, useContext } from "react";
import { FilterType, SortType, StoreType } from "../../interfaces/StoreInterface";
import { Layout, Typography, Badge, FloatButton, Spin } from "antd";
import RestaurantContent from "../../components/ComputerViews/RestaurantContent";
import FoodFilter from "../../components/ComputerViews/FoodFilter";
import { FoodBackendType, FoodCategory, FoodType, fallbackSRC } from "../../interfaces/FoodInterface";
import { categoryApi } from "../../api/category";
import { StoreIdContext } from "../../App";
import { storeApi } from "../../api/store";
import {
    SettingOutlined,
} from '@ant-design/icons';

const { Header, Content } = Layout;

const ComputerRestaurantPage = ( ) => {    
    const [foods, setFoods] = useState<FoodType[]>([]);
    const [store, setStore] = useState<StoreType>();
    const [foodPicture, setFoodPicture] = useState(fallbackSRC);
    const [tagsList, setTagsList] = useState<FoodCategory[]>([]);
    const storeId = useContext<number>(StoreIdContext);
    const [spinning, setSpinning] = useState<boolean>(true);

    const fetchCatagories = useCallback(async () => {
        const response = await categoryApi.getAllCategory(storeId);
        if( response && response.status === 200 ){
            setTagsList(response.data.categories);
        } else {
            console.log(response);
        }
    }, [storeId])
    const fetchCategoriesByMealId = useCallback(async (mealId: number) => {
        const response = await categoryApi.getCategoryByMealId(storeId, mealId);
        if( response && response.status === 200 ){
            return response.data.categories;
        } else {
            return [];
        }
    }, [storeId]);
    const fetchStore = useCallback(async () => {
        const response = await storeApi.getStoreById(storeId);
        if( response && response.status === 200 ){
            setStore(response.data.store);
            setFoodPicture(response.data.store.picture_url);
        }
        else {
            console.log(response);
        }
    }, [storeId])
    const fetchFoods = useCallback(async () => {
        setSpinning(true);
        const response = await storeApi.getAllMeal(storeId);
        if( response && response.status === 200 ){
            const meals = await Promise.all(response.data.meals.map(async (meal: FoodBackendType) => {
                return {
                    id: meal.id,
                    name: meal.name,
                    description: meal.description,
                    price: meal.price,
                    picture: meal.picture,
                    is_available: meal.is_available,
                    soldAmount: 0,
                    key: meal.id,
                    categories: await fetchCategoriesByMealId(meal.id),
                    customizations: meal.customizations,
                }
            }));
            setFoods(meals);
            setSpinning(false);
        } else {
            console.log(response);
        }
    }, [storeId, fetchCategoriesByMealId])

    useEffect(() => {
        fetchCatagories();
        fetchStore();
        fetchFoods();
        setSpinning(false);
    }, [fetchCatagories, fetchStore, fetchFoods])

    const foodMaxPrice = useMemo(() => {
        return foods && foods.length > 0 ? foods.reduce((prev, current) => (prev.price > current.price ? prev : current)).price : 0;
    }, [foods])
    const foodMinPrice = useMemo(() => {
        return foods && foods.length > 0 ? foods.reduce((prev, current) => (prev.price < current.price ? prev : current)).price : 0;
    }, [foods])

    // filterList
    const [searchValue, setSearchValue] = useState('');
    const [sortValue, setSortValue] = useState(SortType.NONE);
    const [priceRange, setPriceRange] = useState([foodMinPrice, foodMaxPrice + 1])
    const [filterArray, setFilterArray] = useState([FilterType.ONSTOCK, FilterType.SOLDOUT]);
    const [filterTags, setFilterTags] = useState<string[]>(tagsList.map((tag) => `${tag.id}`));
    const [openFilter, setOpenFilter] = useState(false);

    const onFilter = (newSearchValue: string, 
                      newPrice: number[], 
                      newFilterStatus: FilterType[], 
                      newSortValue: SortType, 
                      newTags: string[]) => {
        setSearchValue(newSearchValue);
        setPriceRange(newPrice);
        setFilterArray(newFilterStatus);
        setSortValue(newSortValue);
        setFilterTags(newTags);
    }
    const onClean = () => {
        setSearchValue('');
        setPriceRange([foodMinPrice, foodMaxPrice + 1]);
        setFilterArray([FilterType.ONSTOCK, FilterType.SOLDOUT]);
        setSortValue(SortType.NONE);
        setFilterTags(tagsList.map((tag) => `${tag.id}`));
    }

    useEffect(() => {
        setPriceRange([foodMinPrice, foodMaxPrice])
        setFilterTags(tagsList.map((tag) => `${tag.id}`));
    }, [foodMinPrice, foodMaxPrice, tagsList])

    const isInFilter = useMemo(() => {
        return !(searchValue === '' && sortValue === SortType.NONE)
    }, [searchValue, sortValue])

   const filterFoods = useMemo(() => {
    let result = [...foods];
    if( searchValue !== '' ) result = result.filter((food) => food.name.includes(searchValue))
    if( sortValue === SortType.POPULAR ) result = result.sort((foodA, foodB) => foodB.soldAmount - foodA.soldAmount);
    return result.filter((food) => {
        const foodStatus = food.is_available ? FilterType.ONSTOCK : FilterType.SOLDOUT;
        return (
            (food.price >= priceRange[0] && food.price <= priceRange[1]) && 
            (filterArray.findIndex((f) => f === foodStatus) !== -1) && 
            (food.categories.filter(
                (f) => filterTags.findIndex(
                    (ftag) => ftag === `${f.id}`
                ) !== -1 ).length > 0
            
            )
        )
    });
   }, [foods, searchValue, sortValue, priceRange, filterArray, filterTags])

    const showFilter = () => setOpenFilter(true);

    return (
        <Layout className='w-full'>
            <Spin spinning={spinning} fullscreen tip={'Loading...'}/>
            <FloatButton onClick={showFilter} className='w-12 h-12 mr-12' tooltip={<div>Filter</div>} type="primary" icon={<SettingOutlined />}/>
            <Header className="p-0 h-[100px]">
                <img alt={store?.name} src={foodPicture} onError={() => setFoodPicture(fallbackSRC)}
                className="w-full h-full" />
            </Header>
            <Layout hasSider>
                <Content className="bg-white">
                    <div className="flex flex-col justify-center items-center">
                        <Typography.Title className="flex flex-row justify-center pt-4">{store?.name}</Typography.Title>
                        <Badge status={store && store.status ? 'success' : 'default' } text={store && store.status ? 'OPENING' : 'CLOSE'} />
                    </div>
                    <FoodFilter open={openFilter} 
                                setOpen={setOpenFilter}
                                defaultSearchValue={searchValue}
                                defaultPrice={priceRange}
                                defaultFilterStatus={filterArray}
                                defaultSortValue={sortValue}
                                defaultFilterTags={filterTags}
                                tagsList={tagsList}
                                foodMinPrice={foodMinPrice}
                                foodMaxPrice={foodMaxPrice}
                                onFilter={onFilter}
                                onClean={onClean}
                    />
                    <RestaurantContent isInFilter={isInFilter} foods={filterFoods} tagsList={tagsList} fetchMeals={fetchFoods}/>
                </Content>
                {
                    /*
                <Sider reverseArrow collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <FoodFilter collapsed={collapsed}
                                sortValue={sortValue}
                                foodMaxPrice={foodMaxPrice}
                                priceRange={priceRange}
                                filterArray={filterArray}
                                filterTags={filterTags}
                                fullTagsList={tagsList}
                                initStoreStatus={store && store.status ? true : false}
                                setSearchValue={setSearchValue}
                                setSortValue={setSortValue}
                                setPriceRange={setPriceRange}
                                setFilterArray={setFilterArray}
                                setFilterTags={setFilterTags}
                                clearFilter={clearFilter}
                    />
                </Sider>
                */
                }
            </Layout>
        </Layout>
    )
}

export default ComputerRestaurantPage;