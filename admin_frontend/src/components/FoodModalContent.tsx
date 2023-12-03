import { Flex, Space, Upload, Button, Image, Typography, Input, InputNumber, Switch, Divider, Form, Modal } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import type { RcFile, UploadProps } from 'antd/es/upload';
import { useEffect, useState } from "react";
import type { FormInstance } from "antd/lib";
import { ModalType, MyModalProps } from "../interfaces/ModalInterface";
import { fallbackSRC } from "../interfaces/FoodInterface";
import TagList from "./TagList";
import SingleSelectionContent from "./SingleSelectionContent";
import MultipleSelectionContent from "./MultipleSelectionContent";
import { SaveOutlined } from '@ant-design/icons';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
});

const FoodModalContent = ({ food, tagList, type, open, setOpen } : MyModalProps) => {
    const [imageSrc, setImageSrc] = useState(food ? food.picture : '');
    const [foodName, setFoodName] = useState(food? food.name : 'Edit Name');
    const [foodDescription, setFoodDescription] = useState(food ? (food.description === null ? '' : food.description) : '');
    const [foodPrice, setFoodPrice] = useState(food ? food.price : 0);
    const [foodStatus, setFoodStatus] = useState(food ? food.status : false);
    const [foodTagList, setFoodTagList] = useState(food ? food.tags : []);
    const [fullTagList, setFullTagList] = useState(tagList)
    const [SingleForm] = Form.useForm<FormInstance<object>>();
    const [MultipleForm] = Form.useForm<FormInstance<object>>();

    const handleSave = async () => {
        console.log(imageSrc, foodName, foodDescription, foodPrice, foodStatus, foodTagList, fullTagList, SingleForm.getFieldsValue(), MultipleForm.getFieldsValue())
    }

    useEffect(() => {
        SingleForm.resetFields();
        MultipleForm.resetFields();
    }, [])

    useEffect(() => {
        setImageSrc(food ? food.picture : '');
        setFoodName(food ? food.name : 'Edit Name');
        setFoodDescription(food ? (food.description === null ? '' : food.description ) : '' );
        setFoodPrice(food ? food.price : 0);
        setFoodStatus(food ? food.status : false);
        setFoodTagList(food ? food.tags : []);
        SingleForm.setFieldValue('items', food.singleSelections.map((selections) => {
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
        }))
        MultipleForm.setFieldValue('items', food.multipleSelections.map((selections) => {
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
        }))
    }, [food, SingleForm, MultipleForm])
    
    const props: UploadProps = {
        name: 'file',
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        headers: {
          authorization: 'authorization-text',
        },
        async onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
            console.log(type);
          }
          if (info.file.status === 'done') {
            //console.log(`${info.file} file uploaded successfully`)
            if( info.file.originFileObj !== undefined ){
                setImageSrc(await getBase64(info.file.originFileObj))
            }
          } else if (info.file.status === 'error') {
            //console.log(`${info.file.name} file upload failed.`)
          }
        },
        progress: {
          strokeColor: {
            '0%': '#108ee9',
            '100%': '#87d068',
          },
          strokeWidth: 3,
          format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
        },
    }

    return (
        <Modal title={type === ModalType.NEW ? '新增餐點' : '編輯餐點'} 
               open={open} 
               onOk={handleSave} 
               onCancel={() => setOpen(false)}
               width={700}
               okText={(<Space><SaveOutlined/>儲存</Space>)}
               okType="danger"
               cancelText="取消"
        >
        <Flex wrap='wrap' vertical gap={50} className="pt-8 pb-8">
            <Space wrap direction="vertical">
                <Upload maxCount={1} {...props}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
                <Image src={imageSrc} fallback={fallbackSRC} width={250} height={250}/>
            </Space>
            <Space wrap direction="vertical" size="middle">
                <Typography.Text className="text-xl" editable={{ onChange: setFoodName }}>{foodName}</Typography.Text>
                <TagList tagList={foodTagList} setTagList={setFoodTagList} fullTagList={fullTagList} setFullTagList={setFullTagList}/>
                <InputNumber addonAfter="$" defaultValue={0} value={foodPrice} onChange={(value: number | null) => setFoodPrice(value === null ? 0 : value)} />
                <Input.TextArea rows={4} 
                                placeholder="Enter Description here" 
                                showCount 
                                maxLength={100} 
                                value={foodDescription}
                                onChange={(e) => setFoodDescription(e.target.value)}
                />
                <Space wrap direction="vertical" size="small">
                    <Typography.Text>餐點狀況</Typography.Text>
                    <Switch checkedChildren="ON STOCK" unCheckedChildren="SOLD OUT" checked={foodStatus} onChange={(checked: boolean) => setFoodStatus(checked)} />
                </Space>
                <Divider plain>餐點單選項編輯</Divider>
                <SingleSelectionContent form={SingleForm} singleSelections={[]} />
                <Divider plain>餐點多選項編輯</Divider>
                <MultipleSelectionContent form={MultipleForm} multipleSelections={[]} />
            </Space>
        </Flex>
        </Modal>
    )
}

export default FoodModalContent;