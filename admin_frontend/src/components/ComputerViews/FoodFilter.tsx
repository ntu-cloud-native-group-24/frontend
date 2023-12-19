import { Button, Checkbox, Drawer, Flex, Input, Radio, Select, Slider, Typography } from "antd"
import { useState } from "react"
import { FilterType, SortType } from "../../interfaces/StoreInterface";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { FoodFilterProps } from "../../interfaces/FoodInterface";
import { SelectProps } from "antd/lib";
import {
    SaveFilled,
    ClearOutlined,
} from '@ant-design/icons';

// open, setOpen : <boolean>
// defaultSearchValue : string
// foodMinPrice, foodMaxPrice : number, number
// defaultPrice : [number, number]
// defaultFilterStatus: FilterType[]
// defaultSortValue: SortType.NONE;
// defaultFilterTags: string[]
// tagsList: FoodCategory[]
// onFilter: (searchValue, price, filterStatus, sortValue, tags) => void
const FoodFilter = ({ open, setOpen, defaultSearchValue, foodMinPrice, foodMaxPrice, defaultPrice, defaultFilterStatus, defaultSortValue, defaultFilterTags, tagsList, onFilter, onClean} : FoodFilterProps) => {
    
    const [searchValue, setSearchValue] = useState('');
    const [price, setPrice] = useState<number[]>(defaultPrice);
    const [filterStatus, setFilterStatus] = useState<FilterType[]>(defaultFilterStatus);
    const [sortValue, setSortValue] = useState<SortType>(defaultSortValue || SortType.NONE);
    const [tags, setTags] = useState<string[]>(defaultFilterTags);

    const onChangeBox = (checkedValues: CheckboxValueType[]) => {
        setFilterStatus(checkedValues.map((check) => {
            return check === FilterType.ONSTOCK ? FilterType.ONSTOCK : FilterType.SOLDOUT
        }));
    }
    const options: SelectProps['options'] = tagsList.map((tag) => {
        return {
            label: tag.name.toUpperCase(),
            value: `${tag.id}`
        }
    });

    const onClickSave = () => {
        onFilter(searchValue, price, filterStatus, sortValue, tags);
        setOpen(false);
    }

    return (
        <Drawer title='Filter Menu'
                placement="right"
                closable={true}
                onClose={() => setOpen(false)}
                open={open}
                key={'right'}
        >
            <Flex vertical gap='large'>
                <Flex vertical gap='small'>
                    <Typography.Text>Filter By Name</Typography.Text>
                    <Input.Search 
                        placeholder='Search food...'
                        defaultValue={defaultSearchValue}
                        className='w-full'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </Flex>
                <Flex vertical gap='small'>
                    <Typography.Text>Price Range</Typography.Text>
                    <Slider className="w-full" range min={foodMinPrice} max={foodMaxPrice} defaultValue={defaultPrice} onAfterChange={(value: number[]) => setPrice(value)} />
                </Flex>
                <Flex vertical gap='small'>
                    <Typography.Text>Food Status</Typography.Text>
                    <Checkbox.Group style={{ width: '100%' }} onChange={onChangeBox} value={filterStatus} defaultValue={defaultFilterStatus}>
                        <Flex vertical gap='small'>
                            <Checkbox value={FilterType.ONSTOCK}> ON STOCK </Checkbox>
                            <Checkbox value={FilterType.SOLDOUT}> SOLD OUT</Checkbox>
                        </Flex>
                    </Checkbox.Group>
                </Flex>
                <Flex vertical gap='small'>
                    <Typography.Text>Filter By Category</Typography.Text>
                    <Select
                        mode='multiple'
                        style={{ width: '100%' }}
                        placeholder='Select Filters Categories'
                        defaultValue={defaultFilterTags}
                        onChange={(value: string[]) => setTags(value)}
                        options={options}
                    />
                </Flex>
                <Flex vertical gap='small'>
                    <Typography.Text>Food Sorting</Typography.Text>
                    <Radio.Group style={{ width: '100%' }} onChange={(e) => setSortValue(e.target.value)} value={sortValue}>
                        <Flex vertical gap='small'>
                            <Radio value={SortType.NONE}> NONE </Radio>
                            <Radio value={SortType.POPULAR}> POPULAR </Radio>
                        </Flex>
                    </Radio.Group>
                </Flex>
                <Flex vertical gap={32} className="pt-8">
                    <Button onClick={() => {setOpen(false); onClean()}} icon={<ClearOutlined />} type='primary' style={{ backgroundColor: 'gray' }}>Reset</Button>
                    <Button onClick={onClickSave} danger type='primary' icon={<SaveFilled />}>Save</Button>
                </Flex>
            </Flex>
        </Drawer>
    )
}

export default FoodFilter