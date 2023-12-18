import { Button, Card, Flex, Modal, Typography, Badge, Divider, Statistic, Image, message } from "antd"
import { OrderDetailType, OrderProps } from "../../interfaces/OrderInterface"
import { EyeOutlined, DollarOutlined } from '@ant-design/icons';
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { FoodType, fallbackSRC } from "../../interfaces/FoodInterface";
import { orderApi } from "../../api/order";
import { mealApi } from "../../api/meal";
import { StoreIdContext } from "../../App";

const { confirm } = Modal;


export interface OrderFoodDisplayProps {
    orderDetail: OrderDetailType;
    storeId: number;
}
const OrderFoodDisplay = ({ orderDetail, storeId }: OrderFoodDisplayProps ) => {
    
    const [meal, setMeal] = useState<FoodType>();

    useEffect(() => {
        const fetchMeal = async () => {
            const response = await mealApi.getMealById(storeId, orderDetail.meal_id);
            if( response && response.status === 200 ) setMeal(response.data.meal);
        }
        fetchMeal();
    }, [storeId, orderDetail])

    const singleSelections = useMemo(() => {
        return orderDetail ? orderDetail.customizations.selectionGroups.filter((selectionGroup) => {
            return selectionGroup.type === 'radio';
        }): [];
    }, [orderDetail])
    const multipleSelections = useMemo(() => {
        return orderDetail ? orderDetail.customizations.selectionGroups.filter((selectionGroup) => {
            return selectionGroup.type === 'checkbox';
        }): [];
    }, [orderDetail])

    const InnerDisplay = () => {
        if( singleSelections.length === 0  && multipleSelections.length === 0 ){
            return <p className="opacity-70 text-[11px]">無</p>
        } else{
            return (
                <>
                {singleSelections.map((selection) => (
                    <Flex vertical key={selection.title}>
                        <p className="opacity-70 text-[11px]">{selection.title}</p>
                        {selection.items.map((item) => (
                            item.selected ? <p key={item.name} className="opacity-50 text-[10px]">{item.name} (${item.price})</p> : <div key={item.name}></div>
                        ))}
                    </Flex>
                ))}
                {multipleSelections.map((selection) => (
                    <Flex vertical key={selection.title}>
                        <p className="opacity-70 text-[11px]">{selection.title}</p>
                        {selection.items.map((item) => (
                            item.selected ? <p key={item.name} className="opacity-50 text-[10px]">{item.name} (${item.price})</p> : <div key={item.name}></div>
                        ))}
                    </Flex>
                ))}
                </>
            )
        }
    }

    return (
        <Flex gap='middle' align="start">
            <Image 
                src={meal?.picture} 
                fallback={fallbackSRC} 
                width={48}
                height={48}
            />
            <Flex vertical>
                <p className="font-bold">{meal?.name} (${orderDetail.calculated_price_per_item}) x{orderDetail.quantity}</p>
                <InnerDisplay />
            </Flex>
        </Flex>
    )
}

const OrderDisplay = ({ order, fetchOrders } : OrderProps ) => {

    const userPicture = 'https://xsgames.co/randomusers/avatar.php?g=pixel';
    const [orderDetails, setOrderDetails] = useState<OrderDetailType[]>([]);
    const [messageApi, contextHolder] = message.useMessage();
    const storeId = useContext(StoreIdContext);
    
    const success = useCallback((msg: string) => {
        messageApi.success(msg);
    }, [messageApi])
    const error = useCallback((err: string) => {
        messageApi.error(err);
    }, [messageApi])

    const fetchOrderDetail = useCallback(async () => {
        const response = await orderApi.getOrderDetail(order.id);
        if( response && response.status === 200 ){
            setOrderDetails(response.data.order.details);
        } else {
            error(response.data);
        }
    }, [order.id, error]);

    useEffect(() => {
        fetchOrderDetail();
    }, [order, fetchOrderDetail])
    
    const badgeStatus = useMemo(() => {
        const status = order.state
        if( status === 'prepared' ){
            return 'processing'
        } else if( status === 'pending' ){
            return 'warning'
        } else{
            return 'success'
        }
    }, [order])

    const badgeText = useMemo(() => {
        const status = order.state;
        if( status === 'prepared' ){
            return 'PREPARING'
        } else if( status === 'pending' ){
            return 'PENDING'
        } else{
            return 'DONE'
        }
    }, [order])

    const deliveryMethodText = useMemo(() => {
        if( order.delivery_method === 'delivery' ){
            return 'By Deliver'
        } else {
            return 'By Pick up'
        }
    }, [order])

    const paymentTypeText = useMemo(() => {
        if( order.payment_type === 'cash' ){
            return 'By Cash'
        } else if ( order.payment_type === 'credit_card' ){
            return 'By Credit Card'
        } else {
            return 'By Monthly'
        }
    }, [order])    

    const onRejectOrder = async () => {
        const response = await orderApi.rejectOrder(order.id);
        if( response && response.status === 200 ){
            success('Reject Order Success');
            fetchOrders();
        } else {
            error(response.data);
        }
    }

    const parsedDate = useMemo(() => {
        const date = new Date(order.created_at);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        return { year, month, day, hours, minutes, seconds };
    }, [order.created_at]);

    const OrderContent = () => {
        return ( 
            <Flex vertical gap='small' className="pb-8">
                {contextHolder}
                <Flex vertical>
                    <p className="text-xl font-bold">Order #{order.id}</p>
                    <Badge status={badgeStatus} text={badgeText} />
                    <p className="opacity-60">{parsedDate.year}-{parsedDate.month}-{parsedDate.day}</p>
                    <p className="opacity-60">{parsedDate.hours}:{parsedDate.minutes < 10 ? '0' + parsedDate.minutes : parsedDate.minutes}:{parsedDate.seconds < 10 ? '0' + parsedDate.seconds : parsedDate.seconds}</p>
                </Flex>
                <Divider />
                <Flex vertical gap='small'>
                    {orderDetails.map((orderDetail) => (
                        <OrderFoodDisplay key={orderDetail.id} orderDetail={orderDetail} storeId={storeId} />
                    ))}
                </Flex>
                <Divider />
                <Flex gap='small'>
                    <DollarOutlined />
                    <p className="font-bold">Total: ${order.calculated_total_price}</p>
                </Flex>
                <Divider />
                <Flex vertical justify="center" >
                    <p className="font-bold text-lg">Remarks</p>
                    <Typography.Paragraph className="opacity-80">{order.notes}</Typography.Paragraph>
                </Flex>
                <Divider />
                <Flex wrap='wrap' gap="large" >
                    <Statistic title="Delivery Method" value={deliveryMethodText} />
                    <Statistic title="Payment Type" value={paymentTypeText} />
                    <Statistic title="Address" value="N/A" />
                </Flex>
                <Divider />
                <Flex wrap='wrap' gap="middle" align="center"  >
                    <img src={userPicture} width={64} height={64} />
                    <Statistic title="Username" value={order.user_id} />
                </Flex>
            </Flex>
        )
    }

    const showOrderDetails = () => {
        confirm({
            title: `Order Details`,
            content: (<OrderContent />),
            okText: order.state === 'pending' ? 'Accept Order' : 'Done Order',
            okType: 'primary',
            cancelText: 'Cancel',
            async onOk(){
                if( order.state === 'pending' ){
                    const response = await orderApi.acceptOrder(order.id);
                    if( response && response.status === 200 ){
                        success('Accept Order Success');
                        fetchOrders();
                    } else {
                        error(response.data);
                    }
                }
                else if( order.state === 'preparing' ){
                    const response = await orderApi.preparedOrder(order.id);
                    if( response && response.status === 200 ){
                        success('Done Order Success');
                        fetchOrders();
                    } else {
                        error(response.data);
                    }
                }
            },
            footer: (_, { OkBtn, CancelBtn }) => (
                <>                  
                  <CancelBtn />
                  { order.state === 'pending' || order.state === 'preparing' ? <Button type='primary' danger onClick={onRejectOrder}>Reject</Button> : <></> }
                  {
                    order.state === 'pending' ? <OkBtn /> : (
                        order.state === 'preparing' ? <OkBtn /> : <></>
                    )
                  }
                </>
            ),
        })
    }

    return (
        <>
            <Card onClick={showOrderDetails} hoverable style={{ width: 'full' }} className={order.state === 'cancelled' ? 'bg-red-400' : ''}>
                <Flex justify="space-between" align="center" gap={20}>
                    <Flex vertical className="w-3/4">
                        <p className="text-lg font-bold">Order #{order.id}</p>
                        <p>$ {order.calculated_total_price}</p>
                        <p className="truncate opacity-60">{parsedDate.year}-{parsedDate.month}-{parsedDate.day}</p>
                        <p className="truncate opacity-60">{parsedDate.hours}:{parsedDate.minutes < 10 ? '0' + parsedDate.minutes : parsedDate.minutes}:{parsedDate.seconds < 10 ? '0' + parsedDate.seconds : parsedDate.seconds}</p>
                    </Flex>
                    <EyeOutlined/>
                </Flex>
            </Card>
        </>
    )
}

export default OrderDisplay