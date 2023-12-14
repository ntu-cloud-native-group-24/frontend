import { Flex, Form, Input, Button, Space, Typography } from "antd";
import { SaveOutlined, IssuesCloseOutlined } from "@ant-design/icons";

import { useEffect } from "react";

const PersonalSettings = () => {
    // const [form] = Form.useForm<{name: string; id: string; code: string; subcode: string; account: string;}>();
    const [form] = Form.useForm<{
        username: string;
        email: string;
        cellphone: string;
    }>();

    const onFinish = () => {
        //TODO: send these form to backend
        // post /api/me to change email
        console.log(form.getFieldsValue());
    };
    const onFinishFailed = () => console.log("submit failed!");
    const onClear = () => {
        form.setFieldsValue({
            email: "",
            cellphone: "",
        });
    };

    useEffect(() => {
        //TODO: receive initial data here
    }, []);

    return (
        <Flex vertical gap={48}>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    name="username"
                    label="使用者名稱"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="Ruby" disabled />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="esxxxxxxxxxxx@gmail.com" />
                </Form.Item>
                {/* <Form.Item name="cellphone" label="手機號碼" rules={[{ required: true }]}>
          <Input placeholder="09********" />
        </Form.Item> */}
                <Form.Item>
                    <Flex justify="center" align="center" gap={32}>
                        <Button
                            htmlType="button"
                            onClick={onClear}
                            icon={<IssuesCloseOutlined />}
                        >
                            重置
                        </Button>
                        <Button
                            danger
                            type="primary"
                            htmlType="submit"
                            icon={<SaveOutlined />}
                        >
                            儲存
                        </Button>
                    </Flex>
                </Form.Item>
            </Form>
            <Space direction="vertical">
                <Typography.Text>注意事項</Typography.Text>
                <Flex vertical gap={2}>
                    <p>1. 更改資料需經驗證後才會實際更動</p>
                    <p>2. 請在發送編輯資料請求前確認資料是否正確</p>
                </Flex>
            </Space>
        </Flex>
    );
};

export default PersonalSettings;
