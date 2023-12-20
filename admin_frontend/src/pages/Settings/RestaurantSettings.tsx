import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Flex, Form, Input, Button, Space, Typography, message, Switch, Modal, Spin, Select } from "antd"
import { 
    SaveOutlined,
    IssuesCloseOutlined,
} from '@ant-design/icons';
import { storeApi } from '../../api/store';
import { StoreIdContext } from '../../App';
import { StoreType } from '../../interfaces/StoreInterface';
import { tagApi } from '../../api/tag';
import { TagType } from '../../interfaces/TagInterface';
import { SelectProps } from 'antd/lib';

const placeholder_desc = "A design system for enterprise-level products. Create an efficient an enjoyable work experiences"
const { confirm } = Modal;

const RestaurantSettings = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [spinning, setSpinning] = useState<boolean>(true);
    const storeId = useContext<number>(StoreIdContext);
    const [store, setStore] = useState<StoreType>();
    const [form] = Form.useForm<{name: string; address: string; description: string; email: string, phone: string, status: boolean}>();
    const [tagOptions, setTagOptions] = useState<TagType[]>([]);
    const [storeTags, setStoreTags] = useState<TagType[]>([]);

    const success = (msg: string) => {
        messageApi.open({
          type: 'success',
          content: msg,
        });
    };
    
    const error = useCallback((err: string) => {
    messageApi.open({
        type: 'error',
        content: err,
        });
    }, [messageApi])

    const onFinish = async () => {
        setSpinning(true);
        const name = form.getFieldValue('name');
        const address = form.getFieldValue('address');
        const description = form.getFieldValue('description');
        const email = form.getFieldValue('email');
        const phone = form.getFieldValue('phone');
        const status = form.getFieldValue('status');
        const picture_url = store?.picture_url || '';
        const tags = form.getFieldValue('tags');
        const addedTags = tags.filter((tag: number) => !storeTags.map((storeTag) => storeTag.id).includes(tag));
        const deletedTags = storeTags.filter((storeTag) => !tags.includes(storeTag.id));
        
        if( name.length === 0 || address.length === 0 || email.length === 0 || phone.length === 0 ){
            error('Please fill in the form correctly!');
            setSpinning(false);
            return;
        }

        const response = await storeApi.updateStoreData(storeId, name, description, address, picture_url, status, phone, email);
        if( response && response.status === 200 ){
            await Promise.all(addedTags.map(async (tag: number) => { 
                await tagApi.addStoreTags(storeId, tag);
            }));
            await Promise.all(deletedTags.map(async (tag: TagType) => {
                await tagApi.removeStoreTags(storeId, tag.id);
            }));
            success('Successfully updated store data!');
            await fetchStore();
            await fetchStoreTags();
        } else {
            error(response.data.message);
        }
        
        setSpinning(false);
    }
    const onFinishFailed = () => error('Please fill in the form correctly!');
    const onFill = () => form.resetFields();
    
    const fetchStore = useCallback(async () => {
        const response = await storeApi.getStoreById(storeId);
        if( response && response.status === 200 ){
            const store = response.data.store;
            setStore(store);
            form.setFieldsValue({
                name: store.name,
                address: store.address,
                description: store.description,
                email: store.email,
                phone: store.phone,
                status: store.status,
            })
            
        } else {
            error(response.data.message);
        }
    }, [error, form, storeId])

    const fetchTags = useCallback(async () => {
        const response = await tagApi.getAllTags();
        if( response && response.status === 200 ){
            setTagOptions(response.data.tags);
        } else {
            error(response.data.message);
        }
    }, [error]);
    const fetchStoreTags = useCallback(async () => {
        const response = await tagApi.getStoreTags(storeId);
        if( response && response.status === 200 ){
            setStoreTags(response.data.tags);
            form.setFieldValue('tags', response.data.tags.map((tag: TagType) => tag.id));
        } else {
            error(response.data.message);
        }
    }, [error, storeId, form]);

    useEffect(() => {
        fetchStore();
        fetchTags();
        fetchStoreTags();
        setSpinning(false);
    }, [form, fetchStore, fetchTags, fetchStoreTags])


    const showConfirm = () => {
        confirm({
            title: 'Are you sure to save these data?',
            content: 'Please make sure all the data are correct!',
            async onOk(){
                await onFinish();
            },
            onCancel(){}
        })
    }

    const options: SelectProps['options'] = useMemo(() => {
        return tagOptions.map((tag) => ({label: tag.name, value: tag.id}));
    }, [tagOptions])


    return (
        <Flex vertical gap={48}>
            {contextHolder}
            <Spin spinning={spinning} fullscreen />
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete='off'
            >
                <Form.Item name="name" label="餐廳名稱" rules={[{ required: true }, ]} >
                    <Input placeholder='台大好吃餐廳' data-testid='input-name' />
                </Form.Item>
                <Form.Item name="address" label="餐廳地址" rules={[{ required: true }, ]} >
                    <Input placeholder='校總區 106319 臺北市羅斯福路四段一號02-33663366訪客交通資訊' data-testid='input-address'/>
                </Form.Item>
                <Form.Item name="description" label="餐廳資訊 (optional)" rules={[{ required: false }, ]} >
                    <Input placeholder={placeholder_desc} showCount maxLength={100} data-testid='input-desc' />
                </Form.Item>
                <Form.Item name="phone" label="商務電話" rules={[{ required: true }, ]} >
                    <Input placeholder='0987878787' data-testid='input-phone' />
                </Form.Item>
                <Form.Item name="email" label="商務信箱" rules={[{ required: true }, ]} >
                    <Input placeholder='figma@so_hard.com' data-testid='input-email' />
                </Form.Item>
                <Form.Item name='tags' label='商店分類'>
                    <Select mode='multiple' 
                            placeholder='請選擇商店分類' 
                            data-testid='input-tags' 
                            allowClear 
                            options={options}
                    />
                </Form.Item>
                <Form.Item name='status' label='營業狀況' valuePropName="checked">
                    <Switch checkedChildren='OPENING' unCheckedChildren='CLOSED' data-testid='input-status' />
                </Form.Item>
                <Form.Item>
                    <Flex justify='center' align='center' gap={32}>
                        <Button data-testid='btn-clean' htmlType="button" onClick={onFill} icon={<IssuesCloseOutlined />}>
                            重置
                        </Button>
                        <Button data-testid='btn-submit' danger type='primary' onClick={showConfirm} icon={<SaveOutlined />}>
                            儲存
                        </Button>
                    </Flex>
                </Form.Item>
            </Form>
            
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