import { Button, Card, Flex, Modal, Typography, Badge, Divider, Statistic, Image } from "antd"
import { DeliveryMethod, OrderProps, OrderState, OrderStatus, PaymentType } from "../../interfaces/OrderInterface"
import { EyeOutlined, DollarOutlined } from '@ant-design/icons';
import { useMemo, useState } from "react";
import { fallbackSRC } from "../../interfaces/FoodInterface";
import { FoodDisplayProps } from "../../interfaces/FoodInterface";

const { confirm } = Modal;

const OrderFoodDisplay = ({ food }: FoodDisplayProps ) => {
    
    const InnerDisplay = () => {
        if( food.singleSelections.length === 0  && food.multipleSelections.length === 0 ){
            return <p className="opacity-70 text-[11px]">無</p>
        } else{
            return (
                <>
                {food.singleSelections.map((selection) => (
                    <Flex vertical>
                        <p className="opacity-70 text-[11px]">{selection.title}</p>
                        {selection.selections.map((childSelection) => (
                            <p className="opacity-50 text-[10px]">{childSelection.name} (${childSelection.price})</p>
                        ))}
                    </Flex>
                ))}
                {food.multipleSelections.map((selection) => (
                    <Flex vertical>
                        <p className="opacity-70 text-[11px]">{selection.title}</p>
                        {selection.selections.map((childSelection) => (
                            <p className="opacity-50 text-[10px]">{childSelection.name} (${childSelection.price})</p>
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
                src={food.picture} 
                fallback={fallbackSRC} 
                width={48}
                height={48}
            />
            <Flex vertical>
                <p className="font-bold">{food.name} (${food.price})</p>
                <InnerDisplay />
            </Flex>
        </Flex>
    )
}

const OrderDisplay = ({ order } : OrderProps ) => {

    //TODO: check if order.price is already totalAmount or what
    const totalMoney = order.foods.reduce((acc, v) => acc = acc + v.price + v.singleSelections.reduce((acc, v) => acc + v.selections.reduce((acc, v) => acc + v.price, 0), 0) + v.multipleSelections.reduce((acc, v) => acc + v.selections.reduce((acc, v) => acc + v.price, 0), 0), 0)

    const [userPicture, setUserPicture] = useState(order.user.picture_url)
    
    const badgeStatus = useMemo(() => {
        const status = order.order_status
        if( status === OrderStatus.PREPARED ){
            return 'processing'
        } else if( status === OrderStatus.PENDING ){
            return 'warning'
        } else{
            return 'success'
        }
    }, [order])

    const badgeText = useMemo(() => {
        const status = order.order_status;
        if( status === OrderStatus.PREPARED ){
            return 'PREPARING'
        } else if( status === OrderStatus.PENDING ){
            return 'PENDING'
        } else{
            return 'DONE'
        }
    }, [order])

    const deliveryMethodText = useMemo(() => {
        if( order.delivery_method === DeliveryMethod.DELIVER ){
            return 'By Deliver'
        } else {
            return 'By Pick up'
        }
    }, [order])

    const paymentTypeText = useMemo(() => {
        if( order.payment_type === PaymentType.CASH ){
            return 'By Cash'
        } else if ( order.payment_type === PaymentType.CREDIT_CARD ){
            return 'By Credit Card'
        } else {
            return 'By Monthly'
        }
    }, [order])

    const orderStateText = useMemo(() => {
        if( order.order_state === OrderState.PAID ){
            return 'PAID'
        } else if( order.order_state === OrderState.UNPAID ) {
            return 'UNPAID'
        } else {
            return 'REJECTED BY CUSTOMERS'
        }
    }, [order])
    

    const onRejectOrder = async () => {
        console.log('TODO REJECT')
    }

    const OrderContent = () => {
        return ( 
            <Flex vertical gap='small' className="pb-8">
                <Flex vertical>
                    <p className="text-xl font-bold">Order #{order.id}</p>
                    <Badge status={badgeStatus} text={badgeText} />
                    <p className="opacity-60">{order.timestamp.toUTCString()}</p>
                </Flex>
                <Divider />
                <Flex vertical gap='small'>
                    {order.foods.map((food) => (
                        <OrderFoodDisplay food={food}/>
                    ))}
                </Flex>
                <Divider />
                <Flex gap='small'>
                    <DollarOutlined />
                    <p className="font-bold">Total: ${totalMoney}</p>
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
                    <Statistic title="Order State" value={orderStateText} />
                </Flex>
                <Divider />
                <Flex wrap='wrap' gap="middle" align="center"  >
                    <img src={userPicture} width={64} height={64} onError={() => setUserPicture(fallbackSRC)} />
                    <Statistic title="Username" value={order.user.name} />
                </Flex>
            </Flex>
        )
    }

    const showOrderDetails = () => {
        confirm({
            title: `Order Details`,
            content: (<OrderContent />),
            okText: 'Accept',
            okType: 'primary',
            cancelText: 'Cancel',
            async onOk(){
                //TODO: Accept Order here
                console.log('TODO ACCEPT')
            },
            footer: (_, { OkBtn, CancelBtn }) => (
                <>                  
                  <CancelBtn />
                  <Button type='primary' danger onClick={onRejectOrder}>Reject</Button>
                  <OkBtn />
                </>
            ),
        })
    }

    return (
        <>
            <Card onClick={showOrderDetails} hoverable style={{ width: 'full' }} className={order.order_state === OrderState.ABORT ? 'bg-red-400' : ''}>
                <Flex justify="space-between" align="center" gap={20}>
                    <Flex vertical className="w-3/4">
                        <p className="text-lg font-bold">Order #{order.id}</p>
                        <p>$ {totalMoney}</p>
                        <p className="truncate opacity-60">{order.timestamp.toDateString()}</p>
                    </Flex>
                    <EyeOutlined/>
                </Flex>
            </Card>
        </>
    )
}

export default OrderDisplay