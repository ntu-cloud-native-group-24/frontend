import { Flex, Form, Input, Button, Space, Typography } from "antd";
import { SaveOutlined, IssuesCloseOutlined } from "@ant-design/icons";

import { useEffect } from "react";

const PasswordSettings = () => {

  const { Password } = Input;

  const [form] = Form.useForm<{
    prePassword: string;
    newPassword: string;
    validPassword: string;
  }>();

  const onFinish = () => {
    //TODO: send these form to backend
    // call post /api/me/password to change password
    console.log(form.getFieldsValue());
  };
  const onFinishFailed = () => console.log("submit failed!");

  const onClear = () => {
    form.setFieldsValue({
      prePassword: "",
      newPassword: "",
      validPassword: "",
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
          name="prePassword"
          label="舊密碼"
          rules={[{ required: true }]}
        >
          <Password placeholder="" />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="新密碼"
          rules={[{ required: true }]}
        >
          <Password placeholder="" />
        </Form.Item>
        <Form.Item
          name="validPassword"
          label="再次輸入新密碼"
          rules={[{ required: true }]}
        >
          <Password placeholder="" />
        </Form.Item>
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
          <p>1. 密碼長度： 請輸入至少8個字符以上的密碼。</p>
          <p>
            2.
            密碼應包含至少一個大寫字母、一個小寫字母、一個數字和一個特殊符號（例如！、@、#、$、%等）。
          </p>
        </Flex>
      </Space>
    </Flex>
  );
};

export default PasswordSettings;
