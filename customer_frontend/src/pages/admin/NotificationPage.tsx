import type { MenuProps, CollapseProps } from 'antd';
import { Flex, Space, Dropdown, Divider, Collapse } from "antd"
import { DownOutlined } from '@ant-design/icons';

/*
TODO: 
1. Selection -> ?
2. Define Notification Interface Type
3. Render up with useState
4. Get data from backend
*/

const dummyText = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const onClick: MenuProps['onClick'] = ({ key }) => {
    console.log(key);
};

const selectionItems: MenuProps['items'] = [
    {
      label: '1st menu item',
      key: '1',
    },
    {
      label: '2nd menu item',
      key: '2',
    },
    {
      label: '3rd menu item',
      key: '3',
    },
];

const NotificationPage = () => {

    const items: CollapseProps['items'] = [
        {
          key: '1',
          label: 'This is panel header 1',
          children: <p>{dummyText}</p>,
        },
        {
          key: '2',
          label: 'This is panel header 2',
          children: <p>{dummyText}</p>,
        },
        {
          key: '3',
          label: 'This is panel header 3',
          children: <p>{dummyText}</p>,
        },
    ];

    return (
        <div>
            <Flex justify='flex-end'>
                <Dropdown menu={{ items: selectionItems, onClick }}>
                    <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        選項
                        <DownOutlined />
                    </Space>
                    </a>
                </Dropdown>
            </Flex>
            <Divider />
            <Collapse accordion items={items} />
        </div>
    )
}

export default NotificationPage