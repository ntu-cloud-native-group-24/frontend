import { Flex, message, Spin, Form, Button, Modal, TimePicker, Select, Typography, Divider, Space } from "antd"
import { useContext, useCallback, useState, useEffect } from "react";
import { StoreIdContext } from "../../App";
import { IssuesCloseOutlined, SaveOutlined, DeleteOutlined } from '@ant-design/icons';
import { storeApi } from "../../api/store";
import { HourType } from "../../interfaces/StoreInterface";
import dayjs from 'dayjs';

const { confirm } = Modal;
const weekDay = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const weekDayCh = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];

const WorkTimeSettings = () => {

    const storeId = useContext<number>(StoreIdContext);
    const [messageApi, contextHolder] = message.useMessage();
    const [spinning, setSpinning] = useState<boolean>(false);
    const [hourData, setHourData] = useState<HourType[]>();
    const [form] = Form.useForm();

    const success = (msg: string) => {
        messageApi.open({
            type: 'success',
            content: msg,
        });
    }

    const error = useCallback((err: string) => {
        messageApi.open({
            type: 'error',
            content: err,
        });
    }, [messageApi]);

    const onFinish = async () => {
        
        if( form.getFieldValue('day') === undefined || form.getFieldValue('time') === undefined ){
            error('Please fill in the form correctly!');
            return;
        }
        const day = form.getFieldValue('day')
        const day_index = weekDay.indexOf(day) + 1;
        const open_time = form.getFieldValue('time')[0].format('HH:mm:ss');
        const close_time = form.getFieldValue('time')[1].format('HH:mm:ss');

        setSpinning(true);
        const response = await storeApi.createStoreTime(storeId, day_index, open_time, close_time);
        if( response && response.status === 200 ){
            success('Successfully added store time!');
            fetchHour();
        }
        else{
            error(response.data.message);
        }
        setSpinning(false);

    }
    const onFinishFailed = () => error('Please fill in the form correctly!');
    const onClean = () => form.resetFields();
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
    const showDeleteConfirm = (hour_id: number, day: string, open_time: string, close_time: string) => {
        confirm({
            title: 'Are you sure to delete this work hours?',
            content: `${day.toUpperCase()} ${open_time} ~ ${close_time}`,
            async onOk(){
                setSpinning(true);
                const response = await storeApi.deleteStoreTime(storeId, hour_id);
                if( response && response.status === 200 ){
                    fetchHour();
                    success('Successfully deleted store time!');
                } else {
                    error(response.data.message);
                }
                setSpinning(false);
            },
            onCancel(){}
        })
    }
    const fetchHour = useCallback(async () => {
        setSpinning(true);
        const response = await storeApi.getStoreTimeById(storeId);
        if( response && response.status === 200 ){
            setHourData(response.data.hours);
        } else {
            error(response.data.message);
        }
        setSpinning(false);
    }, [error, storeId]);

    useEffect(() => {
        fetchHour();
    }, [fetchHour])


    return (
        <Flex vertical gap={48}>
            {contextHolder}
            <Spin spinning={spinning} fullscreen />
            <Form
                layout='vertical'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
            >
                <Form.Item name='day' label='Day' rules={[{ required:  true}]}>
                    <Select data-testid='input-day'>
                        {
                            weekDay.map((day, index) => (
                                <Select.Option value={day} key={day}>{weekDayCh[index]}</Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item name='time' label='Time Range' valuePropName="value" rules={[{ required:  true}]}>
                    <TimePicker.RangePicker format='HH:mm:ss' data-testid='input-time-picker' />
                </Form.Item>
                <Form.Item>
                    <Flex justify='center' align='center' gap={32}>
                        <Button data-testid='btn-clear' htmlType="button" onClick={onClean} icon={<IssuesCloseOutlined />}>
                            重置
                        </Button>
                        <Button data-testid='btn-submit' danger type='primary' onClick={showConfirm} icon={<SaveOutlined />}>
                            增加
                        </Button>
                    </Flex>
                </Form.Item>
                <Flex vertical gap={32}>
                    {weekDay.map((day, index) => (
                        <Flex vertical gap={16} key={index}>
                            <Typography.Text>{day.toUpperCase()}</Typography.Text>
                            <Flex vertical gap='small'>
                                {
                                    hourData ? (hourData.filter((hour) => hour.day === index + 1).length === 0 ? <p>OFF DAY</p> : hourData.filter((hour) => hour.day === index + 1).map((time, i) => (
                                        <Space className="w-full" key={i}>
                                            <TimePicker.RangePicker  format='HH:mm:ss' defaultValue={[dayjs(time.open_time, 'HH:mm:ss'), dayjs(time.close_time, 'HH:mm:ss')]} disabled />
                                            <Button danger  type='primary' icon={<DeleteOutlined />} onClick={() => showDeleteConfirm(time.id, day, time.open_time, time.close_time)} />
                                        </Space>
                                    ))) : <p>OFF DAY</p>
                                }
                            </Flex>
                            <Divider />
                        </Flex>
                    ))}
                </Flex>
            </Form>
        </Flex>
    )
}

export default WorkTimeSettings
