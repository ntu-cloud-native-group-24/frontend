import { Button, Card, Form, Input, Space, InputNumber, Switch } from 'antd';
import { MultipleSelectionsProps } from '../interfaces/ModalInterface';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useMemo } from 'react';


const MultipleSelectionContent = ({ form, multipleSelections } : MultipleSelectionsProps) => {

    const initialItems = useMemo(() => {
        return multipleSelections.map((selections) => {
            return {
                name: selections.title,
                list: selections.selections.map((childSelections) => {
                    return {
                        name: childSelections.name,
                        price: childSelections.price,
                        status: childSelections.status,
                    }
                })
            }
        })
    }, [multipleSelections])

    return (
        <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            form={form}
            name="dynamic_multiple_form_complex"
            style={{ maxWidth: 600 }}
            autoComplete="off"
            initialValues={{ items: initialItems }}
        >
        <Form.List name="items">
            {(fields, { add, remove }) => (
            <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                {fields.map((field) => (
                <Card
                    size="small"
                    title={`多選項 ${field.name + 1}`}
                    key={field.key}
                    extra={
                    <CloseOutlined
                        onClick={() => {
                            remove(field.name);
                        }}
                    />
                    }
                >
                    <Form.Item label="選項標題" name={[field.name, 'name']} rules={[{required: true, message: '請輸入選項標題'}]}>
                        <Input />
                    </Form.Item>

                    {/* Nest Form.List */}
                    <Form.Item label="選項">
                    <Form.List name={[field.name, 'list']}>
                        {(subFields, subOpt) => (
                        <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                            {subFields.map((subField) => (
                            <Space key={subField.key}>
                                <Form.Item noStyle name={[subField.name, 'name']} rules={[{required: true, message: '請輸入選擇名稱'}]}>
                                    <Input placeholder="選項名稱" />
                                </Form.Item>
                                <Form.Item noStyle name={[subField.name, 'price']} rules={[{required: true, message: '請輸入價格'}]}>
                                    <InputNumber addonAfter="$" />
                                </Form.Item>
                                <Form.Item noStyle name={[subField.name, 'status']} valuePropName="checked">
                                    <Switch checkedChildren={<CheckOutlined className='pl-3 pr-5' />}
                                            unCheckedChildren={<CloseOutlined className='pl-3 pr-5'/>}  />
                                </Form.Item>
                                <CloseOutlined
                                    onClick={() => {
                                        subOpt.remove(subField.name);
                                    }}
                                />
                            </Space>
                            ))}
                            <Button type="dashed" onClick={() => subOpt.add()} block>
                                + 增加選擇
                            </Button>
                        </div>
                        )}
                    </Form.List>
                    </Form.Item>
                </Card>
                ))}

                <Button type="dashed" onClick={() => add()} block>
                    + 增加多選項
                </Button>
            </div>
            )}
        </Form.List>
        </Form>
  );
}

export default MultipleSelectionContent