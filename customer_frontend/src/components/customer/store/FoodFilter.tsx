import {
    Flex,
    Input,
    Space,
    Typography,
    Slider,
    Checkbox,
    Select,
    Button,
} from "antd";
import { FoodFilterProps } from "../../../interfaces/FoodInterface";
import type { SearchProps } from "antd/es/input";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import type { SelectProps } from "antd";
import { useMemo, useState } from "react";
import { FilterType } from "../../../interfaces/StoreInterface";

const { Search } = Input;

const FoodFilter = ({
    collapsed,
    // sortValue,
    priceRange,
    filterArray,
    filterCategories,
    fullCategoriesList,
    foodMaxPrice,
    initStoreStatus,
    initStoreTimes,
    setSearchValue,
    // setSortValue,
    setPriceRange,
    setFilterArray,
    setFilterCategories,
    clearFilter,
}: FoodFilterProps) => {
    const [storeStatus, setStoreStatus] = useState(initStoreStatus);
    const [storeTimes, setStoreTimes] = useState(initStoreTimes);

    const onSearch: SearchProps["onSearch"] = (value) =>
        setSearchValue(value.trim().toUpperCase());

    const options: SelectProps["options"] = useMemo(() => {
        return fullCategoriesList.map((category) => {
            return {
                label: category.toUpperCase(),
                value: category.toUpperCase(),
            };
        });
    }, [fullCategoriesList]);

    // const onChangeRadio = (e: RadioChangeEvent) => {
    //     setSortValue(e.target.value);
    // };
    const onChangeCheckbox = (checkedValues: CheckboxValueType[]) => {
        setFilterArray(
            checkedValues.map((check) => {
                return check === FilterType.ONSTOCK
                    ? FilterType.ONSTOCK
                    : FilterType.SOLDOUT;
            })
        );
    };
    const handleChangeCategories = (value: string[]) => {
        setFilterCategories(value);
    };

    const Content = () => {
        return (
            <Flex vertical gap="large" className="sticky top-[calc(64px)] p-4">
                <Space direction="vertical">
                    <Typography.Text>Search Meals</Typography.Text>
                    <Search
                        placeholder="Beef Noodle"
                        allowClear
                        onSearch={onSearch}
                        style={{ width: 170 }}
                    />
                </Space>
                <Space direction="vertical">
                    <Typography.Text>Price Range</Typography.Text>
                    <Slider
                        className="w-full"
                        range
                        max={foodMaxPrice}
                        min={0}
                        defaultValue={priceRange}
                        onAfterChange={(value: number[]) =>
                            setPriceRange(value)
                        }
                    />
                </Space>
                <Space direction="vertical">
                    <Typography.Text>Filter</Typography.Text>
                    <Checkbox.Group
                        style={{ width: "100%" }}
                        onChange={onChangeCheckbox}
                        defaultValue={filterArray}
                    >
                        <Space direction="vertical">
                            <Checkbox value={FilterType.ONSTOCK}>
                                {" "}
                                On Stock{" "}
                            </Checkbox>
                            <Checkbox value={FilterType.SOLDOUT}>
                                {" "}
                                Sold out
                            </Checkbox>
                        </Space>
                    </Checkbox.Group>
                </Space>
                <Space direction="vertical">
                    <Typography.Text>Filter Categories</Typography.Text>
                    <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="Select filters categories"
                        value={filterCategories}
                        onChange={handleChangeCategories}
                        options={options}
                    />
                </Space>
                <Button type="primary" onClick={clearFilter}>
                    {" "}
                    Reset Filter{" "}
                </Button>
            </Flex>
        );
    };
    return (
        <div className="bg-gray-200 w-full min-h-screen h-full">
            {collapsed ? <></> : <Content />}
        </div>
    );
};

export default FoodFilter;
