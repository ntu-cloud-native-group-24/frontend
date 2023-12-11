import { Button, Card, Flex, Input, Typography, Form, Upload, message } from "antd"
import TextArea from "antd/es/input/TextArea"
import {
    PlusOutlined,
} from '@ant-design/icons';
import { UploadChangeParam } from "antd/lib/upload/interface";
import { userApi } from "../api/user";
import { storeApi } from "../api/store";
import { useState } from "react";
import { CreateStoreApiType } from "../interfaces/StoreInterface";
import { BlockBlobClient } from "@azure/storage-blob";
import api from "../api/axiosClient";

const normFile = (e: UploadChangeParam) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
};

const SignupLayout = () => {

    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm()

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Success!',
        });
    };

    const error = (err: string) => {
        messageApi.open({
            type: 'error',
            content: err,
        });
    };

    const warning = (err: string) => {
        messageApi.open({
            type: 'warning',
            content: err,
        });
    };

    const createUserToBackend = async (name: string, email: string, username: string, password: string, ) => {
        const userResponse = await userApi.register(name, username, password, email);
        if( !userResponse || userResponse.status !== 200 ){
            if( userResponse?.data.message === 'User already exists' ){
                return 'OK';
            }
            error(userResponse?.data.message || 'Server Encountered Error');
            return undefined;
        }
        return userResponse;
    }

    const createImageToAzure = async () => {
        const file_prefix = form.getFieldValue('store_picture')[0].originFileObj.name.split('.')[0].trim();
        const file_type = form.getFieldValue('store_picture')[0].type;
        const imageResponse = await storeApi.getImageApi(file_type, file_prefix);
        console.log(imageResponse);
        if( !imageResponse || imageResponse.status !== 200 ){
            error(imageResponse?.data.message || 'Cannot get SAS Token');
            return undefined;
        }
        const sas = imageResponse.data.upload.sas;
        const client = new BlockBlobClient(sas);
        console.log(sas, client);

        const file = form.getFieldValue('store_picture')[0].originFileObj;
        console.log(file);
        const reader = new FileReader();
        reader.onload = async () => {
            const arrayBuffer = reader.result as ArrayBuffer;
            const blob = new Blob([arrayBuffer], { type: file.type });
            console.log(arrayBuffer, blob)
            const azureResponse = await client.uploadData(blob, {
                blobHTTPHeaders: {
                    blobContentType: file.type,
                    blobCacheControl: 'public, max-age=86400'
                }
            });
            console.log(azureResponse);
        }
        reader.readAsArrayBuffer(file);
        return imageResponse.data;
    }

    const createStoreToBackend = async (storeData: CreateStoreApiType) => {
        const storeResponse = await storeApi.createStore(storeData);
        if( !storeResponse || storeResponse.status !== 200 ){
            error(storeResponse?.data.message || 'Server Encountered Error');
            return undefined;
        }
        return storeResponse;
    }

    const onSignup = async () => {
        setLoading(true);

        const name = form.getFieldValue('name')
        const username = form.getFieldValue('username')
        const password = form.getFieldValue('password')
        const email = form.getFieldValue('email')
        if( !email || !name || !username || !password || name.trim().length === 0 || username.trim().length === 0 || password.trim().length === 0 || email.trim().length === 0 ) {
            warning('Please fill in all the fields.')
            setLoading(false); return;
        }
        if( !form.getFieldValue('store_name') || !form.getFieldValue('store_address') || !form.getFieldValue('store_phone') || !form.getFieldValue('store_email') ) {
            warning('Please fill in all the fields.')
            setLoading(false); return;
        }

        /* Danger Zone */
        
        const userResponse = await createUserToBackend(name, email, username, password);
        if( !userResponse ) { setLoading(false); return; }
        const loginResponse = await userApi.login(username, password);
        console.log(loginResponse);
        if (!loginResponse || loginResponse.status !== 200) {
            error(loginResponse?.data.message || 'Server Encountered Error');
            setLoading(false);
            return;
        }
        // Set axios API headers
        const token = loginResponse.data.token;
        api.defaults.headers.common['x-api-key'] = token;

        // Upload image if exists, otherwise skip this step
        let picture_url = '';
        if( form.getFieldValue('store_picture')[0] != undefined ){
            const ImageData = await createImageToAzure();
            if( !ImageData ) { setLoading( false ); return; } 
            picture_url = ImageData.upload.url;
        }

        const storeData: CreateStoreApiType = {
            name: form.getFieldValue('store_name'),
            description: form.getFieldValue('store_description'),
            address: form.getFieldValue('store_address'),
            phone: form.getFieldValue('store_phone'),
            email: form.getFieldValue('store_email'),
            status: true,
            picture_url: picture_url,
        }

        const storeResponse = await createStoreToBackend(storeData);
        if( !storeResponse ) { setLoading(false); return; }
        
        success();
        setLoading(false);
        form.resetFields();
        return;
    }

    return (
        <Flex vertical className='w-screen min-h-screen max-h-full bg-[url("https://wallpaperaccess.com/full/4115675.jpg")] bg-cover' justify="center" align="center">
            <Card className="w-3/4 m-32 opacity-90 bg-gray-100">
                <Flex vertical align="center" gap={64}>
                    <Typography.Title>Sign up</Typography.Title>
                    <Flex vertical className="w-full" align="center">
                        <Form layout='vertical' className="w-1/2" form={form}>
                            <Form.Item label='Name' name='name' rules={[{ required: true }]}>
                                <Input placeholder="wzwr"/>
                            </Form.Item>
                            <Form.Item label="Personal's Email" name='email' rules={[{ required: true, type: 'email' }]}>
                                <Input placeholder="wzwr@cloud_native.com"/>
                            </Form.Item>
                            <Form.Item label='Username' name='username' rules={[{ required: true }]}>
                                <Input placeholder="wzwr1029"/>
                            </Form.Item>
                            <Form.Item label='Password' name='password' rules={[{ required: true }]}>
                                <Input.Password placeholder="s3cr3t" />
                            </Form.Item>
                            <Form.Item label="Store's Name" name='store_name' rules={[{ required: true }]}>
                                <Input placeholder="台大好吃餐廳"/>
                            </Form.Item>
                            <Form.Item label="Store's Description" name='store_description'>
                                <TextArea rows={4} placeholder="Lorem ipsum dolor sit amet, vince adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."/>
                            </Form.Item>
                            <Form.Item label="Store's Address" name='store_address' rules={[{ required: true }]}>
                                <TextArea rows={4} placeholder="106319 臺北市羅斯福路四段一號"/>
                            </Form.Item>
                            <Form.Item label="Store's Phone" name='store_phone' rules={[{ required: true }]}>
                                <Input placeholder="0967878787"/>
                            </Form.Item>
                            <Form.Item label="Store's Email" name='store_email' rules={[{ required: true, type: 'email' }]}>
                                <Input placeholder="figma@so_hard.com"/>
                            </Form.Item>
                            <Form.Item label="Upload Store's banner" valuePropName="fileList" getValueFromEvent={normFile} name="store_picture">
                                <Upload beforeUpload={() => { return false; }}listType="picture-card" maxCount={1}>
                                    <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                        </Form>
                    </Flex>
                    <Flex vertical>
                        <p className="text-[10px] opacity-60">By continuing, you agree to the Self Service PSS and Privacy Policy.</p>
                        <Button loading={loading} onClick={onSignup} type='primary' className="bg-blue-500">Continue</Button>
                    </Flex>
                </Flex>
            </Card>
            {contextHolder}
        </Flex>
    )
}

export default SignupLayout