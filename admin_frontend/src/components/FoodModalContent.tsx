import { Flex, Space, Upload, Button, Image, Typography, Input, InputNumber, Switch, Divider } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import type { RcFile, UploadProps } from 'antd/es/upload';
import { useState, useEffect } from "react";
import { MyModalProps } from "../interfaces/ModalInterface";
import { fallbackSRC } from "../interfaces/FoodInterface";
import TagList from "./TagList";
import SingleSelectionContent from "./SingleSelectionContent";
import MultipleSelectionContent from "./MultipleSelectionContent";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
});

const FoodModalContent = ({ food, tagList, type, 
                            setImageSrcMain, setFoodNameMain, setFoodDescriptionMain, setFoodPriceMain,
                            setFoodStatusMain, setFoodTagListMain, setFullTagListMain, SingleFormMain, MultipleFormMain
                         } : MyModalProps) => {
    const [imageSrc, setImageSrc] = useState(food ? food.picture : '');
    const [foodName, setFoodName] = useState(food? food.name : 'Edit Name');
    const [foodDescription, setFoodDescription] = useState(food ? (food.description === null ? '' : food.description) : '');
    const [foodPrice, setFoodPrice] = useState(food ? food.price : 0);
    const [foodStatus, setFoodStatus] = useState(food ? food.status : false);
    const [foodTagList, setFoodTagList] = useState(food ? food.tags : []);
    const [fullTagList, setFullTagList] = useState(tagList)
    /*
    const [SingleForm] = Form.useForm<FormInstance<object>>();
    const [MultipleForm] = Form.useForm<FormInstance<object>>();
    const singleItems = Form.useWatch('items', SingleForm);
    const multipleItems = Form.useWatch('items', MultipleForm);
    */

    useEffect(() => {
        setImageSrcMain(imageSrc);
        setFoodNameMain(foodName);
        setFoodDescriptionMain(foodDescription);
        setFoodPriceMain(foodPrice);
        setFoodTagListMain(foodTagList);
        setFullTagListMain(fullTagList);
        setFoodStatusMain(foodStatus);
        console.log('OK');
    }, [foodDescription, foodName, foodPrice, foodTagList, fullTagList, imageSrc, setFoodDescriptionMain, setFoodNameMain, setFoodPriceMain, setFoodTagListMain, setFullTagListMain, setImageSrcMain, setFoodStatusMain, foodStatus])

    useEffect(() => {
        SingleFormMain.resetFields();
        MultipleFormMain.resetFields();
    }, [SingleFormMain, MultipleFormMain])
    
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
                <SingleSelectionContent form={SingleFormMain} singleSelections={food ? food.singleSelections : []} />
                <Divider plain>餐點多選項編輯</Divider>
                <MultipleSelectionContent form={MultipleFormMain} multipleSelections={food ? food.multipleSelections : []} />
            </Space>
        </Flex>
    )
}

export default FoodModalContent;