import { Flex, 
    Input, 
    Space, 
    Typography, 
    Radio, 
    Slider, 
    Checkbox, 
    Select, 
    TimePicker, 
    Switch 
} from "antd";
import { FoodFilterProps } from "../interfaces/FoodInterface";
import type { SearchProps } from "antd/es/input";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import type { RadioChangeEvent } from "antd/lib";
import type { SelectProps } from "antd";
import { useState } from 'react';

const { Search } = Input;

const FoodFilter = ({ collapsed } : FoodFilterProps) => {
    const [value, setValue] = useState(1);

    const options: SelectProps['options'] = [{
        label: 'PASTA',
        value: 'PASTA',
    }, {
        label: 'RECOMMEND',
        value: 'RECOMMEND',
    }];
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
    const onChangeRadio = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    const onChangeCheckbox = (checkedValues: CheckboxValueType[]) => {
        console.log('checked = ', checkedValues);
    };
    const handleChangeTags = (value: string[]) => {
        console.log(`selected ${value}`);
    };

    const Content = () => {
        return (
            <Flex vertical gap="large">
                <Space direction="vertical">
                    <Typography.Text>Search Meals</Typography.Text>
                    <Search placeholder="Beef Noodle" allowClear onSearch={onSearch} style={{ width: 170 }} />
                </Space>
                <Space direction="vertical">
                    <Typography.Text>Sort</Typography.Text>
                    <Radio.Group onChange={onChangeRadio} value={value}>
                    <Space direction="vertical">
                        <Radio value={1}>None</Radio>
                        <Radio value={2}>Rating</Radio>
                        <Radio value={3}>Most Popular All Time</Radio>
                    </Space>
                    </Radio.Group>
                </Space>
                <Space direction="vertical">
                    <Typography.Text>Price Range</Typography.Text>
                    <Slider className="w-full" range defaultValue={[20, 50]} />
                </Space>
                <Space direction="vertical">
                    <Typography.Text>Filter</Typography.Text>
                    <Checkbox.Group style={{ width: '100%' }} onChange={onChangeCheckbox}>
                        <Space direction="vertical">
                            <Checkbox value="A"> On Stock </Checkbox>
                            <Checkbox value="B"> Sold out</Checkbox>
                        </Space>
                    </Checkbox.Group>
                </Space>
                <Space direction="vertical">
                    <Typography.Text>Filter Tags</Typography.Text>
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Select filters tag"
                        defaultValue={[]}
                        onChange={handleChangeTags}
                        options={options}
                    />
                </Space>
                <Space direction="vertical">
                    <Typography.Text>Open Times</Typography.Text>
                    <TimePicker.RangePicker format={'HH:mm'} placement='bottomLeft' showNow />
                </Space>
                <Space direction="vertical">
                    <Typography.Text>Restaurant's Status</Typography.Text>
                    <Switch checkedChildren="OPEN" unCheckedChildren="CLOSE" />
                </Space>
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