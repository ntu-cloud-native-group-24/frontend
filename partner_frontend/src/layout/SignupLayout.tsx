import { Button, Card, Flex, Input, Typography, Form, Upload, TimePicker } from "antd"
import TextArea from "antd/es/input/TextArea"
import {
    PlusOutlined,
} from '@ant-design/icons';
 

const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
};

const SignupLayout = () => {

    // TODO: Store's Open_time -> Close_time and days (1, ..., 7)
    const [form] = Form.useForm()

    const onSignup = () => {
        console.log(form.getFieldsValue())
    }

    return (
        <Flex vertical className='w-screen min-h-screen max-h-full bg-[url("https://wallpaperaccess.com/full/4115675.jpg")] bg-cover' justify="center" align="center">
            <Card className="w-3/4 m-32 opacity-90 bg-gray-100">
                <Flex vertical align="center" gap={64}>
                    <Typography.Title>Sign up</Typography.Title>
                    <Flex vertical className="w-full" align="center">
                        <Form layout='vertical' className="w-1/2" form={form}>
                            <Form.Item label='Username' name='username' rules={[{ required: true }]}>
                                <Input placeholder="username"/>
                            </Form.Item>
                            <Form.Item label='Password' name='password' rules={[{ required: true }]}>
                                <Input.Password placeholder="password" />
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
                            <Form.Item label="Store's Email" name='store_email' rules={[{ required: true }]}>
                                <Input placeholder="figma@so_hard.com"/>
                            </Form.Item>
                            <Form.Item label="Upload Store's banner" valuePropName="fileList" getValueFromEvent={normFile} name="store_picture">
                                <Upload action="/upload.do" listType="picture-card" maxCount={1}>
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
                        <Button onClick={onSignup} type='primary' className="bg-blue-500">Continue</Button>
                    </Flex>
                </Flex>
            </Card>
        </Flex>
    )
}

export default SignupLayout