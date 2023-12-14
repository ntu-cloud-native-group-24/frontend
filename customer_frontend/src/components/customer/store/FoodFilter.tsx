import { ExclamationCircleFilled } from "@ant-design/icons";
import {
    Flex,
    Input,
    Space,
    Typography,
    Radio,
    Slider,
    Checkbox,
    Select,
    Button,
} from "antd";
import { FoodFilterProps } from "../../../interfaces/FoodInterface";
import type { SearchProps } from "antd/es/input";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import type { RadioChangeEvent } from "antd/lib";
import type { SelectProps } from "antd";
import { useMemo, useState } from "react";
import { FilterType, SortType } from "../../../interfaces/StoreInterface";

const { Search } = Input;

const FoodFilter = ({
    collapsed,
    sortValue,
    priceRange,
    filterArray,
    filterTags,
    fullTagsList,
    foodMaxPrice,
    initStoreStatus,
    initStoreTimes,
    setSearchValue,
    setSortValue,
    setPriceRange,
    setFilterArray,
    setFilterTags,
    clearFilter,
}: FoodFilterProps) => {
    const [storeStatus, setStoreStatus] = useState(initStoreStatus);
    const [storeTimes, setStoreTimes] = useState(initStoreTimes);

    const onSearch: SearchProps["onSearch"] = (value) =>
        setSearchValue(value.trim().toUpperCase());

    const options: SelectProps["options"] = useMemo(() => {
        return fullTagsList.map((tag) => {
            return {
                label: tag.toUpperCase(),
                value: tag.toUpperCase(),
            };
        });
    }, [fullTagsList]);

    const onChangeRadio = (e: RadioChangeEvent) => {
        setSortValue(e.target.value);
    };
    // const onChangeCheckbox = (checkedValues: CheckboxValueType[]) => {
    //     setFilterArray(
    //         checkedValues.map((check) => {
    //             return check === FilterType.ONSTOCK
    //                 ? FilterType.ONSTOCK
    //                 : FilterType.SOLDOUT;
    //         })
    //     );
    // };
    const handleChangeTags = (value: string[]) => {
        setFilterTags(value);
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
                    <Typography.Text>Sort</Typography.Text>
                    <Radio.Group onChange={onChangeRadio} value={sortValue}>
                        <Space direction="vertical">
                            <Radio value={SortType.NONE}>None</Radio>
                            <Radio value={SortType.RATING}>Rating</Radio>
                            <Radio value={SortType.POPULAR}>
                                Most Popular All Time
                            </Radio>
                        </Space>
                    </Radio.Group>
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
                {/* <Space direction="vertical">
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
                            </Checkbox> */}
                            {/* <Checkbox value={FilterType.SOLDOUT}>
                                {" "}
                                Sold out
                            </Checkbox> */}
                        {/* </Space>
                    </Checkbox.Group>
                </Space> */}
                <Space direction="vertical">
                    <Typography.Text>Filter Tags</Typography.Text>
                    <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="Select filters tag"
                        value={filterTags}
                        onChange={handleChangeTags}
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