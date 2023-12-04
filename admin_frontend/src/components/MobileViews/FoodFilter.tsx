import { Button, Flex, Modal, Space, Typography, Input, Divider, Slider, Checkbox, Select, Radio, Switch, TimePicker } from "antd"
import { FoodFilterProps } from "../../interfaces/FoodInterface"

import {
    ClearOutlined,
} from '@ant-design/icons';
import { FilterType, SortType } from "../../interfaces/StoreInterface";
import { SelectProps } from "antd/lib";
import { useState } from 'react';
import type { CheckboxValueType } from "antd/es/checkbox/Group";

const { Search } = Input;

export interface ModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FoodFilter = ({
    sortValue, priceRange, filterArray, filterTags, fullTagsList, foodMaxPrice, initStoreStatus, initStoreTimes,
    setSearchValue, setSortValue, setPriceRange, setFilterArray, setFilterTags, clearFilter 
} : FoodFilterProps) => {
    
    const [openFilterTags, setOpenFilterTags] = useState(false);
    const [openSort, setOpenSort] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    
    const options: SelectProps['options'] = fullTagsList.map((tag) => {
        return {
            label: tag.toUpperCase(),
            value: tag.toUpperCase(),
        }
    });

    const FilterContentTag = ({ open, setOpen } : ModalProps) => {

        const [tags, setTags] = useState(filterTags);

        const handleChangeTags = (value: string[]) => {
            setTags(value)
        }

        const handleApply = () => {
            setFilterTags(tags);
            setOpen(false);
        }

        return (
            <Modal
                title='FilterTags'
                okText='Apply'
                okType='primary'
                cancelText='Cancel'
                open={open}
                onOk={handleApply}
                onCancel={() => setOpen(false)}
            >
                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Select filters tag"
                    value={tags}
                    onChange={handleChangeTags}
                    options={options}
                />
            </Modal>
        )
    }

    const FilterContent = ({ open, setOpen } : ModalProps) => {
        
        const [value, setValue] = useState('')
        const [price, setPrice] = useState(priceRange)
        const [filter, setFilter] = useState(filterArray)

        const handleApply = () => {
            setSearchValue(value);
            setFilterArray(filter)
            setPriceRange(price)
            setOpen(false);
        }

        const onChangeBox = (checkedValues: CheckboxValueType[]) => {
            setFilter(checkedValues.map((check) => {
                return check === FilterType.ONSTOCK ? FilterType.ONSTOCK : FilterType.SOLDOUT
            }));
        }

        return (
            <Modal
                title='Filter'
                okText= 'Apply'
                okType='primary'
                cancelText='Cancel'
                onOk={handleApply}
                onCancel={() => setOpen(false)}
                open={open}
            >
                <Divider />
                <Flex vertical gap='large'>
                    <Space direction='vertical'>
                        <Typography.Text>Filter by name</Typography.Text>
                        <Search placeholder='Beef Noodle' allowClear  value={value} onChange={(e) => setValue(e.target.value)} />
                    </Space>
                    <Space direction='vertical'>
                        <Typography.Text>Price Range</Typography.Text>
                        <Slider className="w-full" range max={foodMaxPrice} min={0} defaultValue={price} onAfterChange={(value: number[]) => setPrice(value)} />
                    </Space>
                    <Space direction='vertical'>
                        <Typography.Text>Food Status</Typography.Text>
                        <Checkbox.Group style={{ width: '100%' }} onChange={onChangeBox} value={filter}>
                        <Space direction="vertical">
                            <Checkbox value={FilterType.ONSTOCK}> On Stock </Checkbox>
                            <Checkbox value={FilterType.SOLDOUT}> Sold out</Checkbox>
                        </Space>
                    </Checkbox.Group>
                    </Space>
                </Flex>
            </Modal>
        )
    }

    const SortContent = ({ open, setOpen }: ModalProps) => {

        const [value, setValue] = useState(sortValue)

        const handleApply = () => {
            setSortValue(value);
            setOpen(false)
        }
        return (
            <Modal
                title='Sort'
                okText='Apply'
                okType='primary'
                cancelText='Cancel'
                open={open}
                onOk={handleApply}
                onCancel={() => setOpen(false)}
            >
                <Radio.Group onChange={(e) => setValue(e.target.value)} value={value}>
                    <Space direction="vertical">
                        <Radio value={SortType.NONE}>None</Radio>
                        <Radio value={SortType.RATING}>Rating</Radio>
                        <Radio value={SortType.POPULAR}>Most Popular All Time</Radio>
                    </Space>
                </Radio.Group>
            </Modal>
        )
    }

    const EditContent = ({ open, setOpen } : ModalProps ) => {

        const [value, setValue] = useState(initStoreStatus)
        //TODO: timeline

        const handleApply = () => {
            //TODO: backend
            console.log('TODO')
            setOpen(false)
        }

        return (
            <Modal
                title='Edit Restaurant Status'
                okText='Apply'
                okType="danger"
                cancelText='Cancel'
                open={open}
                onOk={handleApply}
                onCancel={() => setOpen(false)}
            >
                <Flex vertical gap="large" className='pt-4'>
                    <Space direction="vertical">
                        <Typography.Text>Open Times</Typography.Text>
                        <TimePicker.RangePicker format={'HH:mm'} placement='bottomLeft' showNow />
                    </Space>
                    <Space direction="vertical">
                        <Typography.Text>Restaurant's Status</Typography.Text>
                        <Switch checkedChildren="OPEN" unCheckedChildren="CLOSE" checked={value} onChange={(checked: boolean) => setValue(checked)} />
                    </Space>
                </Flex>
            </Modal>
        )
    }


    const onOpenFilterTags = () => setOpenFilterTags(true)
    const onOpenSort = () => setOpenSort(true)
    const onOpenFilter = () => setOpenFilter(true);
    const onOpenEdit = () => setOpenEdit(true)

    return (
        <Flex className="w-full pb-4 overflow-x-auto pr-4" gap="middle" align="center">
            <Button onClick={onOpenFilter} className="bg-gray-200">Filter</Button>
            <Button onClick={onOpenFilterTags} className="bg-gray-200">Filter Tags</Button>
            <Button onClick={onOpenSort} className="bg-gray-200">Sort</Button>
            <Button onClick={onOpenEdit} type='primary' danger>Edit Restaurant</Button>
            <Button icon={<ClearOutlined />} className="bg-gray-200" onClick={clearFilter} shape="circle"/>
            <FilterContentTag open={openFilterTags} setOpen={setOpenFilterTags} />
            <SortContent open={openSort} setOpen={setOpenSort} />
            <FilterContent open={openFilter} setOpen={setOpenFilter} />
            <EditContent open={openEdit} setOpen={setOpenEdit} />
        </Flex>
    )
}

export default FoodFilter