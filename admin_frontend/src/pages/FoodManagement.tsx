import { Button, Flex, Table, Image, Badge, Tag, Space, Input, Modal, message, Typography, Spin } from "antd"
import { PlusOutlined,
         ClearOutlined,
} from '@ant-design/icons';
import type { TableProps } from 'antd';
import type { ColumnsType, FilterValue, SorterResult } from 'antd/es/table/interface';
import { useState, useEffect, useMemo, useContext, useCallback } from "react";
import type { FoodBackendType, FoodType } from "../interfaces/FoodInterface";
import { ExclamationCircleFilled } from '@ant-design/icons';
import { FoodCategory, fallbackSRC } from "../interfaces/FoodInterface";
import { ModalType } from "../interfaces/ModalInterface";
import FoodModalContent from "../components/FoodModalContent";
import TagList from "../components/TagList";
import { StoreIdContext } from "../App";
import { categoryApi } from "../api/category";
import { storeApi } from "../api/store";
import { mealApi } from "../api/meal";

const { Search } = Input;
const { confirm } = Modal;

const FoodManagement = () => {
    const [data, setData] = useState(Array<FoodType>());
    const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
    const [sortedInfo, setSortedInfo] = useState<SorterResult<FoodType>>({});
    const [spinning, setSpinning] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const [messageApi, contextHolder] = message.useMessage();
    const [open, setOpen] = useState(false);
    const [tableLoading, setTableLoading] = useState(true);
    const [openCategory, setOpenCategory] = useState(false);
    const [targetType, setTargetType] = useState<ModalType>(ModalType.NEW);
    const [targetFood, setTargetFood] = useState<FoodType>({
        id: -1,
        key: Math.floor(Math.random() * 1000000),
        name: '',
        description: '',
        picture: '',
        price: 0,
        is_available: false,
        customizations: {
            selectionGroups: []
        },
        categories: [],
        soldAmount: 0,
    });
    const [tagsList, setTagsList] = useState<FoodCategory[]>([]);
    const [categoryName, setCategoryName] = useState("");
    const storeId = useContext<number>(StoreIdContext);

    const onSuccess = useCallback((text: string) => {
        messageApi.open({
            type: 'success',
            content: text,
          });
    }, [messageApi]);
    const onError = useCallback((text: string) => {
        messageApi.open({
            type: 'error',
            content: text,
        })
    }, [messageApi]);


    const fetchCategories = useCallback(async () => {
        setSpinning(true);
        const response = await categoryApi.getAllCategory(storeId);
        if( response && response.status === 200 ){
            setTagsList(response.data.categories);
        } else {
            onError(response.data.message || '取得分類失敗');
        }
        setSpinning(false);
    }, [onError, storeId])
    const fetchCategoriesByMealId = useCallback(async (mealId: number) => {
        const response = await categoryApi.getCategoryByMealId(storeId, mealId);
        if( response && response.status === 200 ){
            return response.data.categories;
        } else {
            return [];
        }
    }, [storeId]);
    const fetchSoldAmountByMealId = useCallback(async (mealId: number) => {
        const response = await mealApi.getSalesCount([mealId]);
        if( response && response.status === 200 ){
            const result = response.data.results.find((res: any) => res.meal_id === mealId);
            return result ? result.count : 0;
        }
        return undefined;
    }, [])

    const fetchMeals = useCallback(async () => {
        setSpinning(true);
        const response = await storeApi.getAllMeal(storeId);
        if( response && response.status === 200 ){
            const meals = await Promise.all(response.data.meals.map(async (meal: FoodBackendType) => {
                return {
                    id: meal.id,
                    name: meal.name,
                    description: meal.description,
                    picture: meal.picture,
                    price: meal.price,
                    is_available: meal.is_available,
                    customizations: meal.customizations,
                    categories: await fetchCategoriesByMealId(meal.id),
                    soldAmount: await fetchSoldAmountByMealId(meal.id),
                    key: meal.id, // prevent key missing props
                }
            }));
            setData(meals);
        } else {
            // If something wrong...
            onError(response.data.message || '取得餐點失敗')
        }
        setSpinning(false);
    }, [fetchCategoriesByMealId, onError, storeId, fetchSoldAmountByMealId])

    useEffect(() => {
        setTableLoading(true);
        fetchMeals();
        fetchCategories();
        setTableLoading(false);
    }, [fetchMeals, fetchCategories])

    const handleChange: TableProps<FoodType>['onChange'] = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter as SorterResult<FoodType>);
    };

    const filterData = useMemo(() => {
        if( searchValue.length === 0 ) return data;
        else {
            return data.filter((food) => food.name.includes(searchValue))
        }
    }, [data, searchValue])

    const onSearch = (value: string) => setSearchValue(value.trim());

    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
        setSearchValue("");
    };

    // Open Modal
    const onClickAdd = () => {
        const food : FoodType = {
            id: -1,
            key: Math.floor(Math.random() * 1000000),
            name: '',
            description: '',
            picture: '',
            price: 0,
            is_available: false,
            customizations: {
                selectionGroups: []
            },
            categories: [],
            soldAmount: 0,
        };
        setTargetType(ModalType.NEW);
        setTargetFood(food);
        setOpen(true);
    }
    const onClickEdit = (id: number) => {
        const food = data.find((food) => food.id === id);
        if( !food ) return;
        setTargetType(ModalType.EDIT)
        setTargetFood(food);
        setOpen(true);
    }
    const onClickDelete = (id: number) => {
        const food = data.find((food) => food.id === id);
        if( !food ) return;
        confirm({
            title: '確認操作',
            icon: <ExclamationCircleFilled/>,
            content: (
                <Space wrap direction="vertical" >
                    <p>確認刪除餐點？</p>      
                </Space>
            ),
            okText: '確認',
            okType: 'danger',
            cancelText: '取消',
            async onOk() {
                const response = await mealApi.deleteMeal(storeId, id);
                if( response && response.status === 200 ){
                    onSuccess('成功刪除餐點');
                    fetchMeals();
                } else {
                    onError(response.data.message || '刪除餐點失敗');
                }
            },
        })
    }
    

    const columns: ColumnsType<FoodType> = [
        {
            title: '餐點資訊',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.length > b.name.length ? 1 : -1,
            sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
            render: (_, food) => (
                <Space align="center" size="middle" key={food.id}>
                    <Image width={32} 
                           height={32} 
                           src={food.picture} 
                           fallback={fallbackSRC} 
                    />
                    <p>{food.name}</p>
                </Space>
            ),
        },
        {
            title: '價格',
            dataIndex: 'price',
            key: 'price',
            filters: Array.from({ length: 20 }, (_, index) => {
                return {
                    text: `$${index * 50} - $${(index + 1) *  50}`,
                    value: index * 50,
                }
            }).concat({
                text: `> $1000`,
                value: 1000,
            }),
            filteredValue: filteredInfo.price || null,
            onFilter: (value: any, record) => { 
                if( value >= 1000 ){
                    return record.price > value;
                } else {
                    return record.price > value && record.price <= (value + 50)   
                }
            },
            sorter: (a, b) => a.price - b.price,
            sortOrder: sortedInfo.columnKey === 'price' ? sortedInfo.order : null,
            render: (_, food) => (
                <p key={food.id}>$ {food.price}</p>
            )
        },
        {
            title: '餐點狀態',
            dataIndex: 'status',
            key: 'status',
            filters: [
                {text: 'ON STOCK', value: true},
                {text: 'SOLD OUT', value: false},
            ],
            filteredValue: filteredInfo.status || null,
            onFilter: (value: any, record) => record.is_available === value,
            sorter: (a) => a.is_available ? 1 : -1,
            sortOrder: sortedInfo.columnKey === 'status' ? sortedInfo.order : null,
            render: (_ ,food) => (
                <Badge status={food.is_available ? 'success' : 'error'} 
                       text={food.is_available ? 'ON STOCK' : 'SOLD OUT'} 
                       key={food.id}
                />
            )
        },
        {
            title: '餐點總售賣次數',
            dataIndex: 'soldAmount',
            key: 'soldAmount',
            filters: Array.from({ length: 20 }, (_, index) => {
                return {
                    text: `${index * 100 === 0 ? 0 : index * 100 + 1} - ${(index + 1) * 100}`,
                    value: index * 100,
                }
            }).concat({
                text: '> 2000',
                value: 2000,
            }),
            filteredValue: filteredInfo.soldAmount || null,
            onFilter: (value: any, record) => {
                if (value >= 2000){
                    return record.soldAmount > 2000
                } else {
                    return record.soldAmount > value && record.soldAmount <= (value + 100)
                }
            },
            sorter: (a, b) => a.soldAmount - b.soldAmount,
            sortOrder: sortedInfo.columnKey === 'soldAmount' ? sortedInfo.order : null,
        },
        {
            title: '餐點 Tag',
            dataIndex: 'tags',
            key: 'tags',
            filters: tagsList.length === 0 ? [] : tagsList.map((tag) => {
                return { text: tag.name, value: tag.name }
            }),
            filteredValue: filteredInfo.tags || null,
            onFilter: (_, record) => {
                const result = record.categories?.filter((category) => filteredInfo.tags?.findIndex((v) => v === category.name) !== -1)
                return result?.length === filteredInfo.tags?.length;
            },
            render: (_, {categories}) => (
                <Space wrap >
                    {
                    categories?.map((category) => category.name.toUpperCase() === 'RECOMMEND' ? (
                        <Tag key={category.name + category.id} color='green'>{category.name.toUpperCase()}</Tag>
                    ) : ( category.name.toUpperCase() === 'FOOD' ? (
                        <Tag key={category.name + category.id} color='orange'>{category.name.toUpperCase()}</Tag>
                    ) : ( category.name.toUpperCase() === 'DRINK' ? (
                        <Tag key={category.name + category.id} color='blue'>{category.name.toUpperCase()}</Tag>
                    ) : <Tag key={category.name + category.id}>{category.name.toUpperCase()}</Tag>
                    )))
                    }
                </Space>
            )
        },
        {
            title: '動作',
            key: 'action',
            render: (_ ,food) => (
                <Space size="middle" key={food.id}>
                    <Button type='link' onClick={() => onClickEdit(food.id)} >編輯</Button>
                    <Button type='link' danger onClick={() => onClickDelete(food.id)}>刪除</Button>
                </Space>
            )
        }
    ];

    const onAddCategory = async () => {
        if( categoryName.trim().length === 0 ){
            onError('請輸入分類名稱');
            return;
        }
        const response = await categoryApi.createNewCategory(storeId, categoryName);
        if( response && response.status === 200 ){
            onSuccess('成功新增分類');
            setCategoryName('');
            fetchCategories();
        } else {
            onError(response.data.message || '新增分類失敗');
        }
    }
    const onEditCategory = () => setOpenCategory(true);

    return (
        <Flex vertical gap="middle">
            <p>餐點管理表單</p>
            {contextHolder}
            <Spin spinning={spinning} fullscreen />
            <FoodModalContent food={targetFood} 
                              tagList={tagsList}
                              type={targetType}
                              open={open}
                              setOpen={setOpen} 
                              fetchMeals={fetchMeals}
            />
            <Modal title="編輯餐點分類"
                   closable={true}
                   open={openCategory}
                   footer={null}
                   onCancel={() => setOpenCategory(false)}
            >
                <Flex justify="flex-start" gap={32} vertical>
                    <Flex vertical gap={8} className="pb-4 pt-4" >
                        <Typography.Text>目前分類</Typography.Text>
                        <TagList tagList={tagsList} />
                    </Flex>
                    <Flex vertical gap={8} className="pb-4">
                        <Typography.Text>新增分類</Typography.Text>
                        <Space>
                            <Input placeholder="輸入新的分類" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                            <Button type="primary" onClick={onAddCategory}>新增</Button>
                        </Space>
                    </Flex>
                </Flex>
            </Modal>
            <Flex justify="flex-start" align="center" gap="middle" wrap='wrap'>
                <Search
                    placeholder="搜尋餐點名稱"
                    allowClear
                    onSearch={onSearch}
                    data-testid='search-bar'
                />
                <Button data-testid='add-food-btn' icon={<PlusOutlined/>} type="primary" onClick={onClickAdd}>Add New</Button>
                <Button data-testid='edit-category-btn' icon={<PlusOutlined/>} type='primary' onClick={onEditCategory} style={{ backgroundColor: 'green' }}>Edit Category</Button>
                <Button data-testid='clear-filter-btn' type="default" shape="circle" icon={<ClearOutlined />} onClick={clearAll} />
            </Flex>
            <Table columns={columns} 
                   dataSource={filterData} 
                   scroll={{ x: 800 }} 
                   sticky={{ offsetHeader: 0 }} 
                   onChange={handleChange}
                   loading={tableLoading}
                   data-testid='food-management-table'
            />
        </Flex>
    )
}

export default FoodManagement