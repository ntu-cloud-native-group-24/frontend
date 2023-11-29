import { Button, Input, Space, Collapse, Flex } from "antd"
import { useState } from "react";
import type { CollapseProps } from 'antd';

const { Search } = Input;
const onClickStyle = "bg-blue-500";
const onCloseStyle = "";
const onClickType = "primary";
const onCloseType = "default";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'This is panel header 1',
    children: <p>{text}</p>,
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: <p>{text}</p>,
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: <p>{text}</p>,
  },
];

const HelperPage = () => {

    const [selectedButton, setSelectedButton] = useState(0)

    const onSearch = () => {
        //TODO:
        console.log('TODO');
    }
    //e: React.MouseEvent<HTMLButtonElement>
    const onClickBtn = (value: number) => {
        setSelectedButton(value);
        // TODO: replace collapse panel with corresponding target.
    }

    return (
        <Flex vertical justify="space-evenly" className="h-full">
            <div className="flex flex-col justify-center gap-5">
                <Search placeholder="input search text" onSearch={onSearch} allowClear />
                <Space wrap>
                    <Button type={selectedButton === 0 ? onClickType : onCloseType} 
                            className={selectedButton === 0 ? onClickStyle : onCloseStyle} 
                            key={0}
                            onClick={() => onClickBtn(0)}
                    >
                        餐廳管理疑問
                    </Button>
                    <Button type={selectedButton === 1 ? onClickType : onCloseType} 
                            className={selectedButton === 1 ? onClickStyle : onCloseStyle}
                            key={1} 
                            onClick={() => onClickBtn(1)}
                    >
                        餐點管理疑問
                    </Button>
                    <Button type={selectedButton === 2 ? onClickType : onCloseType} 
                            className={selectedButton === 2 ? onClickStyle : onCloseStyle} 
                            key={2}
                            onClick={() => onClickBtn(2)}
                    >
                        訂單管理疑問
                    </Button>
                </Space>
                <Collapse accordion items={items} />
            </div>
        </Flex>
    )
}

export default HelperPage