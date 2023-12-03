import { Button, Flex, Table, Image, Badge, Tag, Space, Input, Modal, message } from "antd"
import { PlusOutlined,
         ClearOutlined,
} from '@ant-design/icons';
import type { TableProps } from 'antd';
import type { ColumnsType, FilterValue, SorterResult } from 'antd/es/table/interface';
import { useState, useEffect, useMemo } from "react";
import type { FoodType } from "../interfaces/FoodInterface";
import { ExclamationCircleFilled } from '@ant-design/icons';

import { dummyData, fallbackSRC } from "../interfaces/FoodInterface";
import { ModalType } from "../interfaces/ModalInterface";
import FoodModalContent from "../components/FoodModalContent";

const { Search } = Input;
const { confirm } = Modal;

const FoodManagement = () => {
    const [data, setData] = useState(Array<FoodType>());
    const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
    const [sortedInfo, setSortedInfo] = useState<SorterResult<FoodType>>({});
    const [searchValue, setSearchValue] = useState("");
    const [messageApi, contextHolder] = message.useMessage();
    const [open, setOpen] = useState(false);
    const [targetType, setTargetType] = useState<ModalType>(ModalType.NEW);
    const [targetFood, setTargetFood] = useState<FoodType>({
        key: Math.random() * 1000000000,
        name: '',
        price: 0,
        status: false,
        soldAmount: 0,
        description: '',
        picture: '',
        tags: [],
        singleSelections: [],
        multipleSelections: [],
    });

    useEffect(() => {
        setData(dummyData)
    }, [])

    const handleChange: TableProps<FoodType>['onChange'] = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter as SorterResult<FoodType>);
    };
    
    const onSuccess = (text: string) => {
        messageApi.open({
          type: 'success',
          content: text,
        });
    };
    const onError = (text: string) => {
        messageApi.open({
          type: 'error',
          content: text,
        });
    };

    const filterData = useMemo(() => {
        if( searchValue.length === 0 ) return data;
        else {
            return data.filter((food) => food.name.includes(searchValue))
        }
    }, [data, searchValue])

    const tagsList = useMemo(() => {
        const result = filterData.flatMap((food) => {
            return food.tags?.map((tag) => tag)
        }).filter((v, i, arr) => arr.indexOf(v) === i) || [];
        if( result.length === 0 ) return [];
        else return result;
    }, [filterData])

    const onSearch = (value: string) => setSearchValue(value.trim());

    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
        setSearchValue("");
    };

    // Open Modal
    const onClickAdd = () => {
        const food : FoodType = {
            key: Math.random() * 1000000000,
            name: '',
            price: 0,
            status: false,
            soldAmount: 0,
            description: '',
            picture: '',
            tags: [],
            singleSelections: [],
            multipleSelections: [],
        };
        setTargetType(ModalType.NEW);
        setTargetFood(food);
        setOpen(true);
    }
    const onClickEdit = (key: number) => {
        const food = data.find((food) => food.key === key);
        if( !food ) return;
        setTargetType(ModalType.EDIT)
        setTargetFood(food);
        setOpen(true);
    }
    const onClickDelete = (key: number) => {
        const food = data.find((food) => food.key === key);
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
                console.log('TODO delete', food);
                //TODO: backend here
                const test = Math.random()
                console.log(test)
                return new Promise((resolve, reject) => {
                    setTimeout(test > 0.5 ? resolve : reject, 1000);
                }).then(() => onSuccess('成功刪除')).catch((e) => onError(e));
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
                <Space align="center" size="middle">
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
            onFilter: (value: number, record) => { 
                if( value >= 1000 ){
                    return record.price > value;
                } else {
                    return record.price > value && record.price <= (value + 50)   
                }
            },
            sorter: (a, b) => a.price - b.price,
            sortOrder: sortedInfo.columnKey === 'price' ? sortedInfo.order : null,
            render: (_, food) => (
                <p>$ {food.price}</p>
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
            onFilter: (value: boolean, record) => record.status === value,
            sorter: (a) => a.status ? 1 : -1,
            sortOrder: sortedInfo.columnKey === 'status' ? sortedInfo.order : null,
            render: (_ ,food) => (
                <Badge status={food.status ? 'success' : 'error'} 
                       text={food.status ? 'ON STOCK' : 'SOLD OUT'} 
                />
            )
        },
        {
            title: '餐點今日售賣次數',
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
            onFilter: (value: number, record) => {
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
                return { text: tag, value: tag }
            }),
            filteredValue: filteredInfo.tags || null,
            onFilter: (_, record) => {
                const result = record.tags?.filter((tag) => filteredInfo.tags?.findIndex((v) => v === tag) !== -1)
                return result?.length === filteredInfo.tags?.length;
            },
            render: (_, {tags}) => (
                <Space wrap>
                    {
                    tags?.map((tag, i) => tag.toUpperCase() === 'RECOMMEND' ? (
                        <Tag key={tag + i} color='green'>{tag.toUpperCase()}</Tag>
                    ) : ( tag.toUpperCase() === 'FOOD' ? (
                        <Tag key={tag + i} color='orange'>{tag.toUpperCase()}</Tag>
                    ) : ( tag.toUpperCase() === 'DRINK' ? (
                        <Tag key={tag + i} color='blue'>{tag.toUpperCase()}</Tag>
                    ) : <Tag key={tag + i}>{tag.toUpperCase()}</Tag>
                    )))
                    }
                </Space>
            )
        },
        {
            title: '動作',
            key: 'action',
            render: (_ ,food) => (
                <Space size="middle">
                    <Button type='link' onClick={() => onClickEdit(food.key)} >編輯</Button>
                    <Button type='link' danger onClick={() => onClickDelete(food.key)}>刪除</Button>
                </Space>
            )
        }
    ];

    return (
        <Flex vertical gap="middle">
            <p>餐點管理表單</p>
            {contextHolder}
            <FoodModalContent food={targetFood} 
                              tagList={tagsList}
                              type={targetType}
                              open={open}
                              setOpen={setOpen} 
            />
            <Flex justify="flex-start" align="center" gap="middle" wrap='wrap'>
                <Search
                    placeholder="搜尋餐點名稱"
                    allowClear
                    onSearch={onSearch}
                />
                <Button icon={<PlusOutlined/>} type="primary" onClick={onClickAdd}>Add New</Button>
                <Button type="default" shape="circle" icon={<ClearOutlined />} onClick={clearAll} />
            </Flex>
            <Table columns={columns} 
                   dataSource={filterData} 
                   scroll={{ x: 800 }} 
                   sticky={{ offsetHeader: 0 }} 
                   onChange={handleChange}
            />
        </Flex>
    )
}

export default FoodManagement