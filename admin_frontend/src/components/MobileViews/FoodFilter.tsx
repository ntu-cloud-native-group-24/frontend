import { Button, Checkbox, Drawer, Flex, Input, Radio, Select, Slider, Typography } from "antd";
import {
    ClearOutlined,
} from '@ant-design/icons';
import { useState } from "react";
import { FilterType, SortType } from "../../interfaces/StoreInterface";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { FoodCategory } from "../../interfaces/FoodInterface";
import { SelectProps } from "antd/lib";

export interface ModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface MobileFoodFilterProps {
    defaultSearchValue: string;
    foodMinPrice: number;
    foodMaxPrice: number;
    defaultPrice: number[];
    defaultFilterStatus: FilterType[];
    defaultSortValue: SortType;
    defaultFilterTags: string[];
    tagsList: FoodCategory[];
    onFilter: (newSearchValue: string, newPriceRange: number[], newFoodStatus: FilterType[]) => void;
    onSort: (newSortValue: SortType) => void;
    onFilterByCategory: (newFilterTags: string[]) => void;
    onClean: () => void;
}

const FoodFilter = (
    { defaultSearchValue, foodMinPrice, foodMaxPrice, defaultPrice, defaultFilterStatus, defaultSortValue, defaultFilterTags, tagsList, onFilter, onSort, onFilterByCategory, onClean } : MobileFoodFilterProps
) => {

    const [openFilter, setOpenFilter] = useState(false);
    const [openSort, setOpenSort] = useState(false);
    const [openFilterTags, setOpenFilterTags] = useState(false);

    const onOpenFilter = () => setOpenFilter(true);
    const onOpenFilterTags = () => setOpenFilterTags(true);
    const onOpenSort = () => setOpenSort(true);

    const FilterContent = ({ open, setOpen } : ModalProps) => {

        const [value, setValue] = useState(defaultSearchValue);
        const [price, setPrice] = useState(defaultPrice);
        const [filterStatus, setFilterStatus] = useState(defaultFilterStatus);

        const onChangeBox = (checkedValues: CheckboxValueType[]) => {
            setFilterStatus(checkedValues.map((check) => {
                return check === FilterType.ONSTOCK ? FilterType.ONSTOCK : FilterType.SOLDOUT
            }));
        }

        const onClickSave = () => {
            onFilter(value, price, filterStatus)
            setOpen(false);
        }

        return (
            <Drawer title='Filter Menu'
                    placement="bottom"
                    closable={true}
                    onClose={() => setOpen(false)}
                    open={open}
                    height={450}
                    key="bottom">
                <Flex vertical gap='large'>
                    <Flex vertical gap='small'>
                        <Typography.Text>Filter by name</Typography.Text>
                        <Input.Search placeholder="Search by name" allowClear value={value} onChange={(e) => setValue(e.target.value)} />
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
                    <Button onClick={onClickSave} type='primary' style={{ backgroundColor: 'black'}}>Save</Button>
                </Flex>
            </Drawer>
        )
    }

    const SortContent = ({ open, setOpen } : ModalProps) => {
        const [sortValue, setSortValue] = useState(defaultSortValue);
        const onClickSave = () => {
            onSort(sortValue);
            setOpen(false);
        }
        return (
            <Drawer title='Sort Menu'
                    placement="bottom"
                    closable={true}
                    onClose={() => setOpen(false)}
                    open={open}
                    height={250}
                    key="bottom">
                <Flex vertical gap='large'>
                    <Flex vertical gap='small'>
                        <Typography.Text>Food Sorting</Typography.Text>
                        <Radio.Group style={{ width: '100%' }} onChange={(e) => setSortValue(e.target.value)} value={sortValue}>
                            <Flex vertical gap='small'>
                                <Radio value={SortType.NONE}> NONE </Radio>
                                <Radio value={SortType.POPULAR}> POPULAR </Radio>
                            </Flex>
                        </Radio.Group>
                    </Flex>
                    <Button onClick={onClickSave} type='primary' style={{ backgroundColor: 'black'}}>Save</Button>
                </Flex>
            </Drawer>
        )
    }

    const FilterContentTag = ({ open, setOpen } : ModalProps) => {
        const [tags, setTags] = useState(defaultFilterTags);
        const options: SelectProps['options'] = tagsList.map((tag) => {
            return {
                label: tag.name.toUpperCase(),
                value: `${tag.id}`
            }
        });
        const onClickSave = () => {
            onFilterByCategory(tags);
            setOpen(false);
        }

        return (
            <Drawer title='Filter By Categories Menu'
                    placement="bottom"
                    closable={true}
                    onClose={() => setOpen(false)}
                    open={open}
                    key="bottom">
                <Flex vertical gap='large'>
                    <Typography.Text>Filter By Category</Typography.Text>
                    <Select
                        mode='multiple'
                        style={{ width: '100%' }}
                        placeholder='Select Filters Categories'
                        value={tags}
                        onChange={(value: string[]) => setTags(value)}
                        options={options}
                    />
                    <Button onClick={onClickSave} type='primary' style={{ backgroundColor: 'black'}}>Save</Button>
                </Flex>
            </Drawer>
        )
    }

    return (
        <Flex className="w-full pb-8 pt-4 overflow-x-auto pr-4" gap="middle" align="center">
            <Button onClick={onOpenFilter} className="bg-gray-200">Filter</Button>
            <Button onClick={onOpenFilterTags} className="bg-gray-200">Filter By Categories</Button>
            <Button onClick={onOpenSort} className="bg-gray-200">Sort</Button>
            <Button icon={<ClearOutlined />} className="bg-gray-200" onClick={onClean} shape="circle"/>
            <SortContent open={openSort} setOpen={setOpenSort} />
            <FilterContent open={openFilter} setOpen={setOpenFilter} />
            <FilterContentTag open={openFilterTags} setOpen={setOpenFilterTags} />
        </Flex>
    )
}

export default FoodFilter;