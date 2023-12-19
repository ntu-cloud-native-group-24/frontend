import { useCallback, useEffect, useMemo, useState, useContext } from "react";
import { FilterType, SortType, StoreType } from "../../interfaces/StoreInterface";
import { Layout, Typography, Badge, FloatButton, Spin, Button, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import RestaurantContent from "../../components/ComputerViews/RestaurantContent";
import FoodFilter from "../../components/ComputerViews/FoodFilter";
import { FoodBackendType, FoodCategory, FoodType, fallbackSRC } from "../../interfaces/FoodInterface";
import { categoryApi } from "../../api/category";
import { StoreIdContext } from "../../App";
import { storeApi } from "../../api/store";
import {
    SettingOutlined,
} from '@ant-design/icons';
import { UploadProps } from "antd/lib";
import { imageApi } from "../../api/image";
import { BlockBlobClient } from "@azure/storage-blob";

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
    const dummyRequest = async ({ onSuccess }: any) => {
        setTimeout(() => {
            onSuccess('ok');
        }, 0);
    }
    const imageProps: UploadProps = {
        name: 'file',
        async onChange(info) {
          if (info.file.status !== 'uploading') {
            //console.log(info.file);
          }
          if (info.file.status === 'done') {
            //console.log(`${info.file} file uploaded successfully`)
            if( info.file.originFileObj !== undefined ){
                try{
                    const file_prefix = info.file.originFileObj.name.split('.')[0].trim();
                    const file_type = info.file.type || '';
                    const imageResponse = await imageApi.getImageApi(file_type, file_prefix);
                    //console.log(imageResponse);
                    const sas = imageResponse.data.upload.sas;
                    const client = new BlockBlobClient(sas);
                    const reader = new FileReader();
                    reader.onload = async () => {
                        const arrayBuffer = reader.result as ArrayBuffer;
                        const blob = new Blob([arrayBuffer], { type: info.file.type });
                        console.log(arrayBuffer, blob)
                        const azureResponse = await client.uploadData(blob, {
                            blobHTTPHeaders: {
                                blobContentType: info.file.type,
                                blobCacheControl: 'public, max-age=86400'
                            }
                        });
                        console.log(azureResponse);
                    }
                    reader.readAsArrayBuffer(info.file.originFileObj)
                    const new_picture_url = imageResponse.data.upload.url;
                    if( !store ) {window.location.reload(); return; }
                    const response = await storeApi.updateStoreData(store.id, store.name, store.description, store.address, new_picture_url, store.status, store.phone, store.email);
                    console.log(response);
                    window.location.reload();
                    
                } catch (err) {
                    console.log(err);
                    window.location.reload();
                }
            }
          } else if (info.file.status === 'error') {
            //console.log(`${info.file.name} file upload failed.`)
          }
        },
    }

    return (
        <Layout className='w-full'>
            <Spin spinning={spinning} fullscreen tip={'Loading...'}/>
            <FloatButton onClick={showFilter} className='w-12 h-12 mr-12' tooltip={<div>Filter</div>} type="primary" icon={<SettingOutlined />}/>
            <Header className="p-0 h-[100px]">
                <Upload className="absolute right-16 top-[240px]" customRequest={dummyRequest} {...imageProps}>
                    <Button shape='circle' icon={<UploadOutlined/> } />
                </Upload>
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