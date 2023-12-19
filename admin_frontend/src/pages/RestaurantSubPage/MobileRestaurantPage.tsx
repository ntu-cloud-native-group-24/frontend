import { Badge, Button, Flex, Spin, Typography, Upload } from "antd"
import { FilterType, SortType, StoreType } from "../../interfaces/StoreInterface"
import { useState, useContext, useEffect, useCallback, useMemo } from "react"
import { FoodBackendType, FoodCategory, FoodType, fallbackSRC } from "../../interfaces/FoodInterface"
import RestaurantContent from "../../components/MobileViews/RestaurantContent"
import FoodFilter from "../../components/MobileViews/FoodFilter"
import { StoreIdContext } from "../../App"
import { storeApi } from "../../api/store"
import { categoryApi } from "../../api/category"
import { UploadOutlined } from '@ant-design/icons';
import { UploadProps } from "antd/lib"
import { imageApi } from "../../api/image"
import { BlockBlobClient } from "@azure/storage-blob"

const MobileRestaurantPage = () => {
    const storeId = useContext<number>(StoreIdContext);
    const [foods, setFoods] = useState<FoodType[]>([]);
    const [store, setStore] = useState<StoreType>();
    const [foodPicture, setFoodPicture] = useState(fallbackSRC);
    const [tagsList, setTagsList] = useState<FoodCategory[]>([]);
    const [spinning, setSpinning] = useState<boolean>(true);

    const fetchCatagories = useCallback(async () => {
        const response = await categoryApi.getAllCategory(storeId);
        if( response && response.status === 200 ){
            setTagsList(response.data.categories);
            setFilterTags(response.data.categories.map((tag: FoodCategory) => `${tag.id}`))
        } else {
            console.log(response);
        }
    }, [storeId,])
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
            const foodMinPrice = meals && meals.length > 0 ? meals.reduce((prev, current) => (prev.price < current.price ? prev : current)).price : 0;
            const foodMaxPrice = meals && meals.length > 0 ? meals.reduce((prev, current) => (prev.price > current.price ? prev : current)).price : 0;
            setPriceRange([foodMinPrice, foodMaxPrice + 1]);
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

    const [searchValue, setSearchValue] = useState('');
    const [sortValue, setSortValue] = useState<SortType>(SortType.NONE);
    const [priceRange, setPriceRange] = useState<number[]>([0, 0]);
    const [filterStatus, setFilterStatus] = useState<FilterType[]>([FilterType.ONSTOCK, FilterType.SOLDOUT]);
    const [filterTags, setFilterTags] = useState<string[]>(tagsList.map((tag) => `${tag.id}`));

    const onClean = () => {
        setSearchValue('');
        const foodMinPrice = foods && foods.length > 0 ? foods.reduce((prev, current) => (prev.price < current.price ? prev : current)).price : 0;
        const foodMaxPrice = foods && foods.length > 0 ? foods.reduce((prev, current) => (prev.price > current.price ? prev : current)).price : 0;
        setPriceRange([foodMinPrice, foodMaxPrice + 1]);
        setFilterStatus([FilterType.ONSTOCK, FilterType.SOLDOUT]);
        setSortValue(SortType.NONE);
        setFilterTags(tagsList.map((tag) => `${tag.id}`));
    }

    const isInFilter = useMemo(() => {
        return !(searchValue === '' && sortValue === SortType.NONE)
    }, [searchValue, sortValue])
    
    const onFilter = (newSearchValue: string, newPriceRange: number[], newFoodStatus: FilterType[]) => {
        setSearchValue(newSearchValue);
        setPriceRange(newPriceRange);
        setFilterStatus(newFoodStatus);
    }

    const onSort = (newSortValue: SortType) => {
        setSortValue(newSortValue);
    }

    const onFilterByCategory = (newFilterTags: string[]) => {
        setFilterTags(newFilterTags);
    }

    const filterFoods = useMemo(() => {
        let result = [...foods];
        if( searchValue !== '' ) result = result.filter((food) => food.name.includes(searchValue))
        if( sortValue === SortType.POPULAR ) result = result.sort((foodA, foodB) => foodB.soldAmount - foodA.soldAmount);
        return result.filter((food) => {
            const foodStatus = food.is_available ? FilterType.ONSTOCK : FilterType.SOLDOUT;
            return (
                (food.price >= priceRange[0] && food.price <= priceRange[1]) && 
                (filterStatus.findIndex((f) => f === foodStatus) !== -1) && 
                (food.categories.filter(
                    (f) => filterTags.findIndex(
                        (ftag) => ftag === `${f.id}`
                    ) !== -1 ).length > 0
                
                )
            )
        });
    }, [foods, searchValue, sortValue, priceRange, filterStatus, filterTags])

    const foodMinPrice = useMemo(() => {
        return foods && foods.length > 0 ? foods.reduce((prev, current) => (prev.price < current.price ? prev : current)).price : 0;
    }, [foods])
    const foodMaxPrice = useMemo(() => {
        return foods && foods.length > 0 ? foods.reduce((prev, current) => (prev.price > current.price ? prev : current)).price : 0;
    }, [foods])

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
                try {
                    const file_prefix = info.file.originFileObj.name.split('.')[0].trim();
                    const file_type = info.file.type || '';
                    const imageResponse = await imageApi.getImageApi(file_type, file_prefix);
                    const sas = imageResponse.data.upload.sas;
                    const client = new BlockBlobClient(sas);
                    const reader = new FileReader();
                    const uploadDataPromise = new Promise((resolve, reject) => {
                        reader.onload = async () => {
                            try {
                                const arrayBuffer = reader.result as ArrayBuffer;
                                const blob = new Blob([arrayBuffer], { type: info.file.type });
                                const azureResponse = await client.uploadData(blob, {
                                    blobHTTPHeaders: {
                                        blobContentType: info.file.type,
                                        blobCacheControl: 'public, max-age=86400'
                                    }
                                });
                                resolve(azureResponse);
                            } catch (err) {
                                reject(err);
                            }
                        };
                        reader.onerror = (error) => {
                            reject(error);
                        };
                    });
                    reader.readAsArrayBuffer(info.file.originFileObj);
                    const new_picture_url = imageResponse.data.upload.url;
                    if (!store) {
                        window.location.reload();
                        return;
                    }
                    const updateStoreDataPromise = storeApi.updateStoreData(store.id, store.name, store.description, store.address, new_picture_url, store.status, store.phone, store.email);
                    await Promise.all([uploadDataPromise, updateStoreDataPromise]);
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
        <Flex vertical className="w-full">
            <Spin spinning={spinning}/>
            <div className="w-full">
                <Upload className="absolute right-16 top-[256px]" customRequest={dummyRequest} {...imageProps}>
                    <Button shape='circle' icon={<UploadOutlined/> } />
                </Upload>
                <img alt={store?.name} src={foodPicture} onError={() => setFoodPicture(fallbackSRC)} className="h-[150px] w-full"/>
            </div>
            <div className="flex flex-col justify-center items-center pb-4">
                <Typography.Title className="flex flex-row justify-center pt-4">{store?.name}</Typography.Title>
                <Badge status={store?.status ? 'success' : 'default' } text={store?.status ? 'OPENING' : 'CLOSE'} />
            </div>
            <FoodFilter
                defaultSearchValue={searchValue}
                foodMinPrice={foodMinPrice}
                foodMaxPrice={foodMaxPrice}
                defaultPrice={priceRange}
                defaultFilterStatus={filterStatus}
                defaultFilterTags={filterTags}
                defaultSortValue={sortValue}
                tagsList={tagsList}
                onFilter={onFilter}
                onSort={onSort}
                onFilterByCategory={onFilterByCategory}
                onClean={onClean}
            />
            <RestaurantContent isInFilter={isInFilter} foods={filterFoods} tagsList={tagsList} fetchMeals={fetchFoods} />
        </Flex>
    )
}

export default MobileRestaurantPage