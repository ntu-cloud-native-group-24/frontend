import { useEffect } from 'react';
import { Flex, Form, Input, Button, Space, Typography } from "antd"
import { 
    SaveOutlined,
    IssuesCloseOutlined,
    FacebookFilled,
    InstagramFilled,
} from '@ant-design/icons';

const placeholder_desc = "A design system for enterprise-level products. Create an efficient an enjoyable work experiences"

const RestaurantSettings = () => {
    const [form] = Form.useForm<{name: string; address: string; description: string; email: string, phone: string}>();

    const onFinish = () => {
        //TODO: send these form to backend
        console.log(form.getFieldsValue());
    }
    const onFinishFailed = () => console.log('submit failed!');
    const onFill = () => {
        form.setFieldsValue({
          description: '',
          email: '',
        });
    };

    const onClickAuthFB = () => {
        // TODO: oAuth FB
        console.log(`FB`);
    }

    const onClickAuthINSTA = () => {
        // TODO: oAuth FB
        console.log(`INSTA`);
    }

    useEffect(() => {
        //TODO: set the initial value of data
        form.setFieldsValue({
            name: '台大好吃餐廳',
            address: '校總區 106319 臺北市羅斯福路四段一號02-33663366訪客交通資訊',
            description: '',
            phone: '0987878787',
            email: 'figma@so_hard.com',
        })
    }, [form])

    return (
        <Flex vertical gap={48}>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete='off'
            >
                <Form.Item name="name" label="餐廳名稱" rules={[{ required: true }, ]} >
                    <Input placeholder='台大好吃餐廳' disabled />
                </Form.Item>
                <Form.Item name="address" label="餐廳地址" rules={[{ required: true }, ]} >
                    <Input placeholder='校總區 106319 臺北市羅斯福路四段一號02-33663366訪客交通資訊' disabled />
                </Form.Item>
                <Form.Item name="description" label="餐廳資訊 (optional)" rules={[{ required: false }, ]} >
                    <Input placeholder={placeholder_desc} showCount maxLength={100} />
                </Form.Item>
                <Form.Item name="phone" label="商務電話" rules={[{ required: true }, ]} >
                    <Input placeholder='0987878787' disabled />
                </Form.Item>
                <Form.Item name="email" label="商務信箱" rules={[{ required: true }, ]} >
                    <Input placeholder='figma@so_hard.com' />
                </Form.Item>
                <Form.Item>
                    <Flex justify='center' align='center' gap={32}>
                        <Button htmlType="button" onClick={onFill} icon={<IssuesCloseOutlined />}>
                            重置
                        </Button>
                        <Button danger type='primary' htmlType="submit" icon={<SaveOutlined />}>
                            儲存
                        </Button>
                    </Flex>
                </Form.Item>
            </Form>
            <Space direction='vertical'>
                <Typography.Text>社群帳號綁定</Typography.Text>
                <Space>
                    <FacebookFilled />
                    <p>Facebook:</p>
                    <Button className='bg-blue-500 text-white' type='primary' onClick={onClickAuthFB}>點我驗證</Button>
                </Space>
                <Space>
                    <InstagramFilled />
                    <p>Instagram:</p>
                    <Button className='bg-[#e1306c] text-white' onClick={onClickAuthINSTA}>點我驗證</Button>
                </Space>
            </Space>
            <Space direction='vertical'>
                <Typography.Text>注意事項</Typography.Text>
                <Flex vertical gap={2}>
                    <p>1. 餐廳名稱、餐廳地址及商務電話須透過聯絡客服中心且進行驗證後才能修改</p>
                    <p>2. 社群帳號綁定為非必要的</p>
                    <p>3. 請在發送編輯資料請求前確認資料是否正確</p>
                </Flex>
            </Space>
        </Flex>
    )
}

export default RestaurantSettings

/*
const RestaurantSettings = () => {

    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");

    return (
        <Flex vertical>
            <Space direction="vertical" size="small">
                <div className="flex flex-col gap-1">
                    <span>
                        <Typography.Text className="text-red-400">* </Typography.Text>
                        <Typography.Text>餐廳名稱</Typography.Text>
                    </span>
                    <Input value="台大好吃餐廳" disabled />
                </div>
                <div className="flex flex-col gap-1">
                    <span>
                        <Typography.Text className="text-red-400">* </Typography.Text>
                        <Typography.Text>餐廳地址</Typography.Text>
                    </span>
                    <Input value="校總區 106319 臺北市羅斯福路四段一號02-33663366訪客交通資訊" disabled />
                </div>
                <div className="flex flex-col gap-1">
                    <span>
                        <Typography.Text>餐廳資訊 </Typography.Text>
                        <Typography.Text className="text-gray-400">(optional)</Typography.Text>
                    </span>
                    <Input placeholder={placeholder_desc} value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1">
                    <span>
                        <Typography.Text className="text-red-400">* </Typography.Text>
                        <Typography.Text>商務電話</Typography.Text>
                    </span>
                    <Input value="0987878787" disabled />
                </div>
                <div className="flex flex-col gap-1">
                    <span>
                        <Typography.Text className="text-red-400">* </Typography.Text>
                        <Typography.Text>商務信箱</Typography.Text>
                    </span>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='figma@so_hard.com' />
                </div>
            </Space>
            <Space>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
            </Space>
            <Space>
                <p>hi</p>
                <p>hi</p>
            </Space>
            <Space>
                <p>hi</p>
                <p>hi</p>
            </Space>
        </Flex>
    )
}

export default RestaurantSettings

*/