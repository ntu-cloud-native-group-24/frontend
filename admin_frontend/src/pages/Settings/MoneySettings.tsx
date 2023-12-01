import { Flex, Form, Input, Button, Space, Typography, Select } from 'antd';
import { 
    SaveOutlined,
    IssuesCloseOutlined,
} from '@ant-design/icons';

import branchData from '../../data/bank';
import { MyBranchInterface } from '../../interfaces/BankInterface';
import { useState, useEffect } from 'react';

const MoneySettings = () => {
    const [form] = Form.useForm<{name: string; id: string; code: string; subcode: string; account: string;}>();
    const bank = Form.useWatch('code', form);
    const [branchSelection, setBranchSelection] = useState(Array<MyBranchInterface>());

    const onFinish = () => {
        //TODO: send these form to backend
        console.log(form.getFieldsValue());
    }
    const onFinishFailed = () => console.log('submit failed!');
    const onClear = () => {
        form.setFieldsValue({
            code: '',
            subcode: '',
            account: '',            
        });
    }

    useEffect(() => {
        const searchBranch = branchData.find((bankInLIST) => bankInLIST.bankCode === bank)
        if( searchBranch === undefined ) setBranchSelection([]);
        else setBranchSelection(searchBranch.branches)
        form.setFieldValue('subcode', '');
    }, [bank, form])

    useEffect(() => {
        //TODO: receive initial data here
    }, [])

    return (
        <Flex vertical gap={48}>
            <Form 
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete='off'
            >
                <Form.Item name="name" label="戶名" rules={[{ required: true }, ]}>
                    <Input placeholder='WzWr' disabled />
                </Form.Item>
                <Form.Item name="id" label="銀行開戶之身分 ID" rules={[{ required: true }, ]}>
                    <Input placeholder='A*********' disabled />
                </Form.Item>
                <Form.Item name="code" label="銀行代號" rules={[{ required: true}, ]}>
                    <Select>
                        {branchData.map((bank) => (
                            <Select.Option key={bank.bankCode} value={bank.bankCode}>{bank.bankCode} {bank.bankName}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="subcode" label="分行" rules={[{ required: true}, ]}>
                    <Select>
                        {branchSelection === undefined ? (<></>) : 
                        branchSelection.map((bank, i) => (
                            <Select.Option key={bank.branchCode + i} value={bank.branchCode}>{bank.branchCode} {bank.branchName}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="account" label="銀行帳號" rules={[{ required: true }, ]}>
                    <Input placeholder='878787891' />
                </Form.Item>
                <Form.Item>
                    <Flex justify='center' align='center' gap={32}>
                        <Button htmlType="button" onClick={onClear} icon={<IssuesCloseOutlined />}>
                            重置
                        </Button>
                        <Button danger type='primary' htmlType="submit" icon={<SaveOutlined />}>
                            儲存
                        </Button>
                    </Flex>
                </Form.Item>
            </Form>
            <Space direction='vertical'>
                <Typography.Text>注意事項</Typography.Text>
                <Flex vertical gap={2}>
                    <p>1. 金流及帳務資料驗證後才會實際更動</p>
                    <p>2. 請在發送編輯資料請求前確認資料是否正確</p>
                </Flex>
            </Space>
        </Flex>
    )
}

export default MoneySettings