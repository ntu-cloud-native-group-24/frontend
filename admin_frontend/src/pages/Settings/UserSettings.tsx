import { Button, Flex, Form, Input, message, Spin } from "antd"
import { 
    SaveOutlined,
    IssuesCloseOutlined,
} from '@ant-design/icons';
import { useEffect, useCallback, useState } from "react";
import { userApi } from "../../api/user";

const UserSettings = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [spinning, setSpinning] = useState<boolean>(true);
    const [form] = Form.useForm<{username: string, old_password: string, new_password: string, new_password_again: string }>();

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
    }, [messageApi]);
    
      const warning = (err: string) => {
        messageApi.open({
          type: 'warning',
          content: err,
        });
      };

    const onFinish = async () => {
        setSpinning(true);
        const username = form.getFieldValue('username');
        const mail = form.getFieldValue('mail');
        const old_password = form.getFieldValue('old_password');
        const new_password = form.getFieldValue('new_password');
        const new_password_again = form.getFieldValue('new_password_again');

        if( username.length === 0 || mail.length === 0 || old_password.length === 0 || new_password.length === 0 || new_password_again.length === 0 ){
            warning('Please fill in the form correctly!');
            setSpinning(false);
            return;
        }

        if( new_password !== new_password_again ){
            warning('New Password does not matched!');
            setSpinning(false);
            return;
        }

        const passwordResponse = await userApi.updatePassword(old_password, new_password);
        if( passwordResponse && passwordResponse.status === 200 ){
            success('Successfully updated password!');
        } else {
            error(passwordResponse.data.message);
            setSpinning(false);
            return;
        }

        const response = await userApi.updateUser(username, mail);
        if( response && response.status === 200 ){
            success('Successfully updated user information!');
            fetchUserData();
        } else {
            error(response.data.message);
            setSpinning(false);
            return;
        }
        setSpinning(false);
    }

    const onFinishFailed = () => {
        error('Please fill in the form correctly!')
    }
    const onFill = () => {
        form.setFieldsValue({
            username: '',
            old_password: '',
            new_password: '',
        })
    };

    const fetchUserData = useCallback(async () => {
        form.setFieldValue('old_password', '');
        form.setFieldValue('new_password', '');
        form.setFieldValue('new_password_again', '');
        const response = await userApi.getCurrentUser();
        if( response && response.status === 200 ){
            form.setFieldValue('username', response.data.user.name);
            form.setFieldValue('mail', response.data.user.email);
        } else {
            error(response.data.message);
        }
    }, [error, form]);

    useEffect(() => {
        fetchUserData();
        setSpinning(false);
    }, [fetchUserData])

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
                <Form.Item name="username" label="使用者用戶名" rules={[{ required: true }, ]} >
                    <Input placeholder='wzwr1029' data-testid='input-name' />
                </Form.Item>
                <Form.Item name="mail" label="使用者信箱" rules={[{ required: true }, {type: 'email'} ]} >
                    <Input placeholder='wzwr@cloud.native.com' data-testid='input-mail'/>
                </Form.Item>
                <Form.Item name="old_password" label="舊密碼" rules={[{ required: true }, ]} >
                    <Input.Password placeholder='請輸入舊密碼' data-testid='input-old-password'/>
                </Form.Item>
                <Form.Item name="new_password" label="新密碼" rules={[{ required: true }, ]} >
                    <Input.Password placeholder='請輸入新密碼' data-testid='input-new-password' />
                </Form.Item>
                <Form.Item name="new_password_again" label="新密碼確認" rules={[{ required: true }, ]} >
                    <Input.Password placeholder='請再次輸入新密碼' data-testid='input-confirm-password' />
                </Form.Item>
                <Form.Item>
                    <Flex justify='center' align='center' gap={32}>
                        <Button data-testid='btn-clear' htmlType="button" onClick={onFill} icon={<IssuesCloseOutlined />}>
                            重置
                        </Button>
                        <Button data-testid='btn-submit' danger type='primary' htmlType="submit" icon={<SaveOutlined />}>
                            儲存
                        </Button>
                    </Flex>
                </Form.Item>
            </Form>
        </Flex>
    )
}

export default UserSettings