import { Flex, Space, Upload, Button, Image, Typography, Input, InputNumber, Switch, Divider, Form, Modal, Select, SelectProps } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import type { RcFile, UploadProps } from 'antd/es/upload';
import { useEffect, useState, useContext } from "react";
import type { FormInstance, UploadFile } from "antd/lib";
import { ModalType, MyModalProps } from "../interfaces/ModalInterface";
import { Customizations, fallbackSRC } from "../interfaces/FoodInterface";

import SingleSelectionContent from "./SingleSelectionContent";
import MultipleSelectionContent from "./MultipleSelectionContent";
import { SaveOutlined } from '@ant-design/icons';
import { StoreIdContext } from "../App";

import { mealApi } from "../api/meal";
import { imageApi } from "../api/image";
import { BlockBlobClient } from "@azure/storage-blob";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
});

const FoodModalContent = ({ food, tagList, type, open, setOpen, fetchMeals } : MyModalProps) => {
    const [imageSrc, setImageSrc] = useState(food ? food.picture : '');
    const [imageFile, setImageFile] = useState<UploadFile<any>>();
    const [foodName, setFoodName] = useState(food? food.name : 'Edit Name');
    const [foodDescription, setFoodDescription] = useState(food ? (food.description === null ? '' : food.description) : '');
    const [foodPrice, setFoodPrice] = useState(food ? food.price : 0);
    const [foodStatus, setFoodStatus] = useState(food ? food.is_available : false);
    const [SingleForm] = Form.useForm<FormInstance<object>>();
    const [MultipleForm] = Form.useForm<FormInstance<object>>();
    const [foodEditCategory, setFoodEditCategory] = useState<Array<string>>(food.categories.map((category) => `${category.id}`));
    const storeId = useContext<number>(StoreIdContext);

    const onResetData = () => {
        setImageSrc('');
        setImageFile(undefined);
        setFoodName('');
        setFoodDescription('');
        setFoodPrice(0);
        setFoodStatus(false);
        SingleForm.resetFields();
        MultipleForm.resetFields();
        setFoodEditCategory([]);
    }

    const onCategoryChange = (value: Array<string>) => {
        setFoodEditCategory(value);
    }

    const uniqueTagList = Array.from(new Set(tagList.map(tag => tag.name))).map(name => {
        return tagList.find(tag => tag.name === name);
    });

    const options: SelectProps['options'] = uniqueTagList.map((tag) => {
        return {
            id: tag?.id,
            label: tag?.name.toUpperCase(),
            value: `${tag?.id}`,
        }
    });

    const constructCustomizationsByForm = () => {
        const customizations: Customizations = {
            selectionGroups: [
                ...SingleForm.getFieldValue('items').map((item: any) => {
                    return {
                        type: 'radio',
                        title: item.name,
                        items: item.list.map((subitem: any) => {
                            return {
                                name: subitem.name,
                                price: subitem.price,
                                enabled: subitem.enabled ? true : false,
                            }
                        })
                    }
                }),
                ...MultipleForm.getFieldValue('items').map((item: any) => {
                    return {
                        type: 'checkbox',
                        title: item.name,
                        items: item.list.map((subitem: any) => {
                            return {
                                name: subitem.name,
                                price: subitem.price,
                                enabled: subitem.enabled ? true : false,
                            }
                        })
                    }
                })
            ]
        }
        return customizations;
    }

    const createImageToAzure = async () => {
        if( !imageFile || !imageFile.originFileObj ) return '';
        const file_prefix = imageFile.originFileObj.name.split('.')[0].trim();
        const file_type = imageFile.type || '';
        const imageResponse = await imageApi.getImageApi(file_type, file_prefix);
        console.log(imageResponse)
        if( !imageResponse || imageResponse.status !== 200 ){
            Modal.error({
                title: '圖片上傳失敗',
                content: imageResponse.data.message,
            })
            return undefined;
        }
        const sas = imageResponse.data.upload.sas;
        const client = new BlockBlobClient(sas);
        const reader = new FileReader();
        reader.onload = async () => {
            const arrayBuffer = reader.result as ArrayBuffer;
            const blob = new Blob([arrayBuffer], { type: imageFile.type });
            console.log(arrayBuffer, blob)
            const azureResponse = await client.uploadData(blob, {
                blobHTTPHeaders: {
                    blobContentType: imageFile.type,
                    blobCacheControl: 'public, max-age=86400'
                }
            });
            console.log(azureResponse);
        }
        reader.readAsArrayBuffer(imageFile.originFileObj);
        return imageResponse.data.upload.url;
    }

    const preCheck = () => {
        if( foodName.trim().length === 0 ){
            Modal.error({
                title: '餐點名稱不可為空',
                content: '請輸入餐點名稱',
            })
            return false;
        }
        if( foodEditCategory.length === 0  ){
            Modal.error({
                title: '餐點類別不可為空',
                content: '請至少選擇一個餐點類別',
            })
            return false;
        }
        if( imageFile && imageFile.originFileObj && !(imageFile.originFileObj.type === 'image/png' || imageFile.originFileObj.type === 'image/jpeg') ){
            Modal.error({
                title: '餐點圖片格式錯誤',
                content: '請上傳 PNG/JPG 圖片',
            })
            return false;
        }
        if (SingleForm.getFieldValue('items') === undefined || 
            SingleForm.getFieldValue('items').some((item: any) => item === undefined 
            || item.list === undefined 
            || item.name === undefined 
            || item.name.trim().length === 0
            || item.list.some((subitem: any) => subitem === undefined || subitem.name === undefined || subitem.price === undefined) ) ) {
            Modal.error({
                title: '餐點選項不可為空',
                content: '請刪除或是填寫選項',
            });
            return false;
        }
        if (MultipleForm.getFieldValue('items') === undefined || 
        MultipleForm.getFieldValue('items').some((item: any) => item === undefined 
            || item.list === undefined 
            || item.name === undefined 
            || item.name.trim().length === 0
            || item.list.some((subitem: any) => subitem === undefined || subitem.name === undefined || subitem.price === undefined) ) ) {
            Modal.error({
                title: '餐點選項不可為空',
                content: '請刪除或是填寫選項',
            });
            return false;
        }
        return true;
    }

    const handleAdd = async () => {
        if( !preCheck() ) return;
        const picture_url = await createImageToAzure();
        
        if( picture_url === undefined ) return;
    
        const customizations = constructCustomizationsByForm();
        
        const response = await mealApi.createMeal(storeId, foodName.trim(), foodDescription, foodPrice, picture_url, foodStatus, customizations)
        if( response && response.status === 200 ){
            Modal.success({
                title: '餐點新增成功',
                content: '餐點新增成功',
            })
        } else {
            Modal.error({
                title: '餐點新增失敗',
                content: response.data.message,
            })
            return;
        }

        const mealId = response.data.meal.id;

        for(let i = 0;i < foodEditCategory.length; i++){
            const category_id = foodEditCategory[i];
            const response = await mealApi.addCategoryToMeal(storeId, mealId, parseInt(category_id));
            if( !response || response.status !== 200 ){
                Modal.error({
                    title: '餐點類別新增失敗',
                    content: response.data.message,
                })
                return;
            }
        }

        setOpen(false);
        await fetchMeals();
        onResetData();
    }

    const handleSave = async () => {
        if( !preCheck() ) return;
        
        const picture_url = imageFile ? await createImageToAzure() : food.picture;
        if( picture_url === undefined ) return;
        const customizations = constructCustomizationsByForm();
        
        const response = await mealApi.updateMeal(storeId, food.id, foodName.trim(), foodDescription, foodPrice, picture_url, foodStatus, customizations)
        if( response && response.status === 200 ){
            Modal.success({
                title: '餐點更新成功',
                content: '餐點更新成功',
            })
        } else {
            Modal.error({
                title: '餐點更新失敗',
                content: response.data.message,
            })
            return;
        }

        
        const foodOriginalCategory = food.categories.map((category) => `${category.id}`);
        const addedCategories = foodEditCategory.filter((category) => !foodOriginalCategory.includes(category));
        const deletedCategories = foodOriginalCategory.filter((category) => !foodEditCategory.includes(category));
        
        for(let i = 0;i < addedCategories.length; i++){
            const category_id = addedCategories[i];
            const response = await mealApi.addCategoryToMeal(storeId, food.id, parseInt(category_id));
            if( !response || response.status !== 200 ){
                Modal.error({
                    title: '餐點類別更新失敗',
                    content: response.data.message,
                })
                return;
            }
        }
        for(let i = 0;i < deletedCategories.length; i++){
            const category_id = deletedCategories[i];
            const response = await mealApi.deleteCategoryFromMeal(storeId, food.id, parseInt(category_id));
            if( !response || response.status !== 200 ){
                Modal.error({
                    title: '餐點類別更新失敗',
                    content: response.data.message,
                })
                return;
            }
        }

        setOpen(false);
        await fetchMeals();
        onResetData();
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
        setFoodStatus(food ? food.is_available : false);
        setFoodEditCategory(food ? food.categories.map((category) => `${category.id}`) : []);
        SingleForm.setFieldValue('items', food.customizations.selectionGroups.filter((selections) => selections.type === 'radio').map((selections) => {
            return {
                name: selections.title,
                list: selections.items.map((childSelections) => {
                    return {
                        name: childSelections.name,
                        price: childSelections.price,
                        enabled: childSelections.enabled,
                    }
                })
            }
        }))
        MultipleForm.setFieldValue('items', food.customizations.selectionGroups.filter((selections) => selections.type === 'checkbox').map((selections) => {
            return {
                name: selections.title,
                list: selections.items.map((childSelections) => {
                    return {
                        name: childSelections.name,
                        price: childSelections.price,
                        enabled: childSelections.enabled,
                    }
                })
            }
        }))
    }, [food, SingleForm, MultipleForm])

    const props: UploadProps = {
        name: 'file',
        async onChange(info) {
          if (info.file.status !== 'uploading') {
            //console.log(info.file);
          }
          if (info.file.status === 'done') {
            //console.log(`${info.file} file uploaded successfully`)
            if( info.file.originFileObj !== undefined ){
                setImageSrc(await getBase64(info.file.originFileObj))
                setImageFile(info.file);
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
          format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
        },
    }

    const dummyRequest = async ({ onSuccess }: any) => {
        setTimeout(() => {
            onSuccess('ok');
        }, 0);
    }

    return (
        <Modal title={type === ModalType.NEW ? '新增餐點' : '編輯餐點'} 
               open={open} 
               onOk={type === ModalType.NEW ? handleAdd : handleSave} 
               onCancel={() => setOpen(false)}
               width={700}
               okText={(<Space><SaveOutlined/>儲存</Space>)}
               okType="danger"
               cancelText="取消"
        >
        <Flex wrap='wrap' vertical gap={50} className="pt-8 pb-8">
            <Space wrap direction="vertical">
                <Upload customRequest={dummyRequest} maxCount={1} {...props}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
                <Image src={imageSrc} fallback={fallbackSRC} width={250} height={250}/>
            </Space>
            <Space wrap direction="vertical" size="middle">
                <Space wrap direction="vertical" size="small">
                    <Typography.Text>餐點名稱</Typography.Text>
                    <Input placeholder="Enter Food Name here" value={foodName} onChange={(e) => setFoodName(e.target.value)} />
                </Space>
                <Space wrap direction="vertical" size="small" className="w-full">
                    <Typography.Text>餐點分類</Typography.Text>
                    <Select mode='multiple' 
                            style= {{ width: '100%' }} 
                            placeholder='Select category for meal here'
                            onChange={onCategoryChange}
                            options={options}
                            key={'SANXIAO'}
                            value={foodEditCategory}
                    />
                </Space>
                <Space wrap direction="vertical" size="small">
                    <Typography.Text>餐點價格</Typography.Text>
                    <InputNumber addonAfter="$" defaultValue={0} value={foodPrice} onChange={(value: number | null) => setFoodPrice(value === null ? 0 : value)} />
                </Space>
                <Space wrap direction="vertical" size="small" className="w-full">
                    <Typography.Text>餐點說明</Typography.Text>
                    <Input.TextArea rows={4} 
                                    placeholder="Enter Description here" 
                                    showCount 
                                    maxLength={100} 
                                    value={foodDescription}
                                    onChange={(e) => setFoodDescription(e.target.value)}
                    />
                </Space>
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