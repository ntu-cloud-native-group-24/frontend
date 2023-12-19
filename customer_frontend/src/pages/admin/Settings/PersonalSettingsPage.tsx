import { Flex, Form, Input, Button, Space, message, Typography } from "antd";
import { SaveOutlined, IssuesCloseOutlined } from "@ant-design/icons";

import { useEffect, useState, useMemo } from "react";

import { userApi } from "../../../api/user";

const { success, warning, error } = message;

const PersonalSettingsPage = () => {
    // const [form] = Form.useForm<{name: string; id: string; code: string; subcode: string; account: string;}>();
    const [form] = Form.useForm<{
        name: string;
        email: string;
    }>();

    const [currentUser, setCurrentUser] = useState({ name: "", email: "" });

    const onFinish = async () => {
        console.log(form.getFieldsValue());

        const { email } = form.getFieldsValue();
        const name = currentUser.name;

        const res = await userApi.updateEmail(name, email);
        if (!res || res.status !== 200) {
            error(res?.data.message);
        } else {
            console.log(res?.data);
            success(res?.data.message);
            currentUser.email = email;
            localStorage.setItem("user", JSON.stringify({ ...currentUser }));
        }
    };
    const onFinishFailed = () => warning("submit failed!");

    const onClear = () => {
        form.setFieldsValue({
            email: "",
        });
    };

    useMemo(() => {
        const userItem = localStorage.getItem("user");
        userItem ? setCurrentUser(JSON.parse(userItem)) : null;
    }, []);

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
                <Form.Item name="name" label="稱謂">
                    <Input placeholder={currentUser.name} disabled />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            type: "email",
                            message: "The input is not valid E-mail!",
                        },
                        {
                            required: true,
                            message: "Please enter your E-mail!",
                        },
                    ]}
                >
                    <Input placeholder={currentUser.email} />
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

export default PersonalSettingsPage;
