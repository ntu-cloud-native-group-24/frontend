import { Button, Card, Flex, Typography, Statistic, Divider, Image, Spin, Modal } from "antd"
import { OrderDetailProps, OrderDetailType } from "../../interfaces/OrderInterface"
import React, { useState, useMemo, useEffect, useCallback, useContext } from "react"
import { FoodType, fallbackSRC } from "../../interfaces/FoodInterface"
import { orderApi } from "../../api/order"
import { mealApi } from "../../api/meal"
import { StoreIdContext } from "../../App"

export interface OrderFoodDisplayProps {
    food: OrderDetailType;
    error: (err: string) => void;
    setSpinning: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrderFoodDisplay = ({ food, error, setSpinning }: OrderFoodDisplayProps ) => {

    const [meal, setMeal] = useState<FoodType>();
    const storeId = useContext(StoreIdContext);

    const fetchMeal = useCallback(async () => {
        const response = await mealApi.getMealById(storeId, food.meal_id);
        if( response && response.status === 200 ){
            setMeal(response.data.meal);
        } else {
            error(response.data.message);
        }
    }, [error, food.meal_id, storeId])

    useEffect(() => {
        fetchMeal();
        setSpinning(false);
    }, [food, fetchMeal, setSpinning])
    
    const singleSelections = useMemo(() => {
        return food ? food.customizations.selectionGroups.filter((selection) => {
            return selection.type === 'radio';
        }) : [];
    }, [food])
    const multipleSelections = useMemo(() => {
        return food ? food.customizations.selectionGroups.filter((selection) => {
            return selection.type === 'checkbox';
        }) : [];
    }, [food])

    return (
        <Flex justify="space-between" align="center">
            <Flex gap='large' align="center">
                <Image src={meal?.picture} fallback={fallbackSRC}
                       width={96} height={96}        
                />
                <Flex vertical gap='small'>
                    <Typography.Text>{meal?.name}</Typography.Text>
                    <Typography.Text className="opacity-60 text-[11px]">x{food.quantity}</Typography.Text>
                </Flex>
            </Flex>
            <Flex gap='small' vertical>
                {singleSelections.map((selection) => (
                    <Flex vertical key={selection.title}>
                        <p className="opacity-100 text-[14px]">{selection.title}</p>
                        {
                            selection.items.map((item) => (
                                item.selected ? <p className="opacity-70 text-[12px]" key={item.name}>{item.name} (${item.price})</p> : <div key={item.name}></div>
                            ))
                        }
                    </Flex>
                ))}
                {multipleSelections.map((selection) => (
                    <Flex vertical key={selection.title}>
                        <p className="opacity-100 text-[14px]">{selection.title}</p>
                        {
                            selection.items.map((item) => (
                                item.selected ? <p className="opacity-70 text-[12px]" key={item.name}>{item.name} (${item.price})</p> : <div key={item.name}></div>
                            ))
                        }
                    </Flex>
                ))}
            </Flex>
            <Flex justify="center" gap={4}>
                <Typography.Text className="text-orange-400 text-md">$</Typography.Text>
                <Typography.Text className="text-md">{food.calculated_price_per_item}</Typography.Text>
            </Flex>
        </Flex>
    )
}

const OrderDetailDisplay = ({ order, fetchOrders, setTargetOrder, messageApi } : OrderDetailProps) => {

    const userPicture = 'https://xsgames.co/randomusers/avatar.php?g=pixel';
    const [foods, setFoods] = useState<OrderDetailType[]>([]);
    const [spinning, setSpinning] = useState(true);

    const success = useCallback((msg: string) => {
        messageApi.success(msg);
    }, [messageApi])
    const error = useCallback((err: string) => {
        messageApi.error(err);
    }, [messageApi])
    
    const deliveryMethodText = useMemo(() => {
        if( !order ) return '';
        if( order.delivery_method === 'delivery' ){
            return 'By Deliver'
        } else {
            return 'By Pick up'
        }
    }, [order])

    const paymentTypeText = useMemo(() => {
        if( !order ) return ''; 
        if( order.payment_type === 'cash' ){
            return 'By Cash'
        } else if ( order.payment_type === 'credit_card' ){
            return 'By Credit Card'
        } else {
            return 'By Monthly'
        }
    }, [order])

    const parsedDate = useMemo(() => {
        const date = new Date(order ? order.created_at : '');
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        return { year, month, day, hours, minutes, seconds };
    }, [order]);

    useEffect(() => {
        const fetchOrderDetail = async () => {
            if( !order ) { setFoods([]); return ;}
            const response = await orderApi.getOrderDetail(order.id);
            if( response && response.status === 200 ){
                setFoods(response.data.order.details);
            } else {
                error('Failed to fetch order detail');
            }
        }
        fetchOrderDetail();
        setSpinning(false);
    }, [order, error])

    const onAcceptOrder = useCallback( async () => {
        if( !order ) return;
        Modal.confirm({
            title: 'Are you sure to accept this order?',
            content: 'This action cannot be undone',
            okText: 'Yes',
            cancelText: 'No',
            onOk: async () => {
                const response = await orderApi.acceptOrder(order.id);
                if( response && response.status === 200 ){
                    success('Successfully update order');
                    fetchOrders();
                    setTargetOrder(undefined);
                } else {
                    error('Failed to update order');
                }
            }
        })
    }, [error, success, order, fetchOrders, setTargetOrder])

    const onDoneOrder = useCallback(async () => {
        if( !order ) return;
        Modal.confirm({
            title: 'Are you sure to notify customer this order is ready to go?',
            content: 'This action cannot be undone',
            okText: 'Yes',
            cancelText: 'No',
            onOk: async () => {
                const response = await orderApi.preparedOrder(order.id);
                if( response && response.status === 200 ){
                    success('Successfully update order');
                    fetchOrders();
                    setTargetOrder(undefined);
                } else {
                    error('Failed to update order');
                }
            }
        })
    }, [error, success, order, fetchOrders, setTargetOrder])

    /*
    const onCompleteOrder = useCallback(async () => {
        if( !order ) return;
        Modal.confirm({
            title: 'Are you sure to complete this order?',
            content: 'This action cannot be undone',
            okText: 'Yes',
            cancelText: 'No',
            onOk: async () => {
                const response = await orderApi.completeOrder(order.id);
                if( response && response.status === 200 ){
                    success('Successfully update order');
                    fetchOrders();
                    setTargetOrder(undefined);
                } else {
                    error('Failed to update order');
                }
            }
        })
    }, [error, success, order, fetchOrders, setTargetOrder])
    */

    const onRejectOrder = async () => {
        if( !order ) return;
        Modal.confirm({
            title: 'Are you sure to reject this order?',
            content: 'This action cannot be undone',
            okText: 'Yes',
            cancelText: 'No',
            onOk: async () => {
                const response = await orderApi.rejectOrder(order.id);
                if( response && response.status === 200 ){
                    fetchOrders();
                    success('Successfully cancelled order');
                    setTargetOrder(undefined);
                } else {
                    error('Failed to reject order');
                }
            }
        })
    }

    const PrimaryButton = useMemo(() => {
        if( !order ) {
            return (
                <Button type="primary">Accept Order</Button>
            )
        }
        else if( order.state === 'pending' ){
            return (
                <Button type="primary" onClick={onAcceptOrder}>Accept Order</Button>
            )
        }
        else if( order.state === 'preparing' ){
            return (
                <Button type="primary" onClick={onDoneOrder}>Done Order</Button>
            )
        } else {
            return (
                <></>
            )
        }
    }, [onAcceptOrder, onDoneOrder, order])

    return order ? (
        <Flex vertical gap='middle' className="pl-8 pr-8 w-full">
            <Spin spinning={spinning} fullscreen />
            <Typography.Title level={5}>Order Details</Typography.Title>
            <Card 
                style={{ minHeight: 700, maxHeight: 'full' }}
                title={(<Flex vertical className="w-3/4 pt-8 pb-8">
                    <p className="text-[14px] font-bold">Order #{order.id}</p>
                    <p className="text-[10px] opacity-60">{parsedDate.year}-{parsedDate.month}-{parsedDate.day}</p>
                    <p className="text-[10px] opacity-60">{parsedDate.hours}:{parsedDate.minutes < 10 ? '0' + parsedDate.minutes : parsedDate.minutes}:{parsedDate.seconds < 10 ? '0' + parsedDate.seconds : parsedDate.seconds}</p>
                    </Flex>)}
                extra={<Flex wrap='wrap' gap="middle" align="center"  >
                            <img src={userPicture} width={64} height={64} />
                            <Statistic title="User_id" value={order.user_id} />
                        </Flex>
                      }
                
            >
                <Flex vertical>
                    <Flex justify="space-between">
                        <Flex vertical className="w-1/2">
                            <Typography.Text className="text-[16px]">Remark</Typography.Text>
                            <Typography.Paragraph className="opacity-70 text-[12px]">
                                {order.notes}
                            </Typography.Paragraph>
                        </Flex>
                        <Flex wrap='wrap' gap="large" className="h-full w-1/2 pl-4 pr-4" justify="center" align="center">
                            <Statistic title="Delivery Method" value={deliveryMethodText} />
                            <Statistic title="Payment Type" value={paymentTypeText} />
                            <Statistic title="Address" value="N/A" />
                        </Flex>
                    </Flex>
                    <Divider />
                        <Flex vertical gap='large'>
                            {
                                foods.map((food) => (
                                    <div key={food.id}>
                                        <OrderFoodDisplay food={food} error={error} setSpinning={setSpinning}/>
                                        {food === foods[foods.length - 1] ? <></> : <Divider dashed />}
                                    </div>
                                ))
                            }
                        </Flex>
                    <Divider />
                    <Flex justify="space-between" align="center">
                        <Typography.Title level={3}>Total </Typography.Title>
                        <Flex justify="center" gap={4}>
                            <Typography.Text className="text-orange-400 text-xl">$</Typography.Text>
                            <Typography.Text className="text-xl">{order.calculated_total_price}</Typography.Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Card>
            <Flex gap='large' justify="flex-end" align="center">
                {
                    order && (order.state === 'pending' || order.state === 'preparing') ? (
                        <Button type='primary' danger onClick={onRejectOrder}>Cancel Order</Button>        
                    ) : <></>
                }
                {PrimaryButton}
            </Flex>
        </Flex>
    ) : <React.Fragment key={'div'}></React.Fragment>
}

export default OrderDetailDisplay