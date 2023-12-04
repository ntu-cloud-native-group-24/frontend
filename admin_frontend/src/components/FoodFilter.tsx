import { ExclamationCircleFilled } from '@ant-design/icons';
import { Flex, 
    Input, 
    Space, 
    Typography, 
    Radio, 
    Slider, 
    Checkbox, 
    Select, 
    TimePicker, 
    Switch, 
    Button,
    Modal
} from "antd";
import { FoodFilterProps } from "../interfaces/FoodInterface";
import type { SearchProps } from "antd/es/input";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import type { RadioChangeEvent } from "antd/lib";
import type { SelectProps } from "antd";
import { useMemo, useState } from 'react';
import { FilterType, SortType } from "../interfaces/StoreInterface";

const { Search } = Input;
const { confirm } = Modal;

const FoodFilter = ({ collapsed, 
    sortValue, priceRange, filterArray, filterTags, fullTagsList, foodMaxPrice, initStoreStatus, initStoreTimes,
    setSearchValue, setSortValue, setPriceRange, setFilterArray, setFilterTags, clearFilter 
} : FoodFilterProps) => {

    const [storeStatus, setStoreStatus] = useState(initStoreStatus)
    const [storeTimes, setStoreTimes] = useState(initStoreTimes)

    const onSearch: SearchProps['onSearch'] = (value) => setSearchValue(value.trim().toUpperCase());

    const options: SelectProps['options'] = useMemo(() => {
        return fullTagsList.map((tag) => {
            return {
                label: tag.toUpperCase(),
                value: tag.toUpperCase(),
            }
        })
    }, [fullTagsList])

    const onChangeRadio = (e: RadioChangeEvent) => {
        setSortValue(e.target.value)
    };
    const onChangeCheckbox = (checkedValues: CheckboxValueType[]) => {
        setFilterArray(checkedValues.map((check) => {
            return check === FilterType.ONSTOCK ? FilterType.ONSTOCK : FilterType.SOLDOUT
        }));
    };
    const handleChangeTags = (value: string[]) => {
        setFilterTags(value)
    };

    const onEdit = () => {
        confirm({
            title: 'Danger Zone',
            icon: <ExclamationCircleFilled/>,
            content: (
                <Flex vertical gap="large" className='pt-4'>
                    <Space direction="vertical">
                        <Typography.Text>Open Times</Typography.Text>
                        <TimePicker.RangePicker format={'HH:mm'} placement='bottomLeft' showNow />
                    </Space>
                    <Space direction="vertical">
                        <Typography.Text>Restaurant's Status</Typography.Text>
                        <Switch checkedChildren="OPEN" unCheckedChildren="CLOSE" checked={storeStatus} onChange={(checked: boolean) => setStoreStatus(checked)} />
                    </Space>
                </Flex>
            ),
            okText: '確認',
            okType: 'danger',
            cancelText: '取消',
            async onOk(){
                //TODO: 1. fix timestamp 
                // 2. backend interation
                console.log('READY SET GO');
            }
        })
    }

    const Content = () => {
        return (
            <Flex vertical gap="large">
                <Space direction="vertical">
                    <Typography.Text>Search Meals</Typography.Text>
                    <Search placeholder="Beef Noodle" allowClear onSearch={onSearch} style={{ width: 170 }} />
                </Space>
                <Space direction="vertical">
                    <Typography.Text>Sort</Typography.Text>
                    <Radio.Group onChange={onChangeRadio} value={sortValue}>
                    <Space direction="vertical">
                        <Radio value={SortType.NONE}>None</Radio>
                        <Radio value={SortType.RATING}>Rating</Radio>
                        <Radio value={SortType.POPULAR}>Most Popular All Time</Radio>
                    </Space>
                    </Radio.Group>
                </Space>
                <Space direction="vertical">
                    <Typography.Text>Price Range</Typography.Text>
                    <Slider className="w-full" range max={foodMaxPrice} min={0} defaultValue={priceRange} onAfterChange={(value: number[]) => setPriceRange(value)} />
                </Space>
                <Space direction="vertical">
                    <Typography.Text>Filter</Typography.Text>
                    <Checkbox.Group style={{ width: '100%' }} onChange={onChangeCheckbox} defaultValue={filterArray}>
                        <Space direction="vertical">
                            <Checkbox value={FilterType.ONSTOCK}> On Stock </Checkbox>
                            <Checkbox value={FilterType.SOLDOUT}> Sold out</Checkbox>
                        </Space>
                    </Checkbox.Group>
                </Space>
                <Space direction="vertical">
                    <Typography.Text>Filter Tags</Typography.Text>
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Select filters tag"
                        value={filterTags}
                        onChange={handleChangeTags}
                        options={options}
                    />
                </Space>
                <Button type="primary" onClick={clearFilter}> Reset Filter </Button>
                <Button type="primary" danger onClick={onEdit}>Edit Restaurant</Button>
            </Flex>
        )
    }
    return (
        <div className="bg-gray-200 h-full border-l-2 w-full p-4">
            {collapsed ? <></> : <Content />} 
        </div>
    )
}

export default FoodFilter;