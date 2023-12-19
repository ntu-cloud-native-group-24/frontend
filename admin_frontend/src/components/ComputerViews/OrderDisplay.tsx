import { Card, Flex } from "antd"
import { OrderCProps, OrderState } from "../../interfaces/OrderInterface"
import { EyeOutlined } from '@ant-design/icons';
import { useMemo } from "react";

const OrderDisplay = ({ order, targetOrder, setTargetOrder }: OrderCProps) => {

    const cardStyle = useMemo(() => {
        if( order.id === targetOrder?.id ){
            return {
                className: 'bg-orange-500'
            }
        } else if ( order.state === OrderState.CANCELLED ){
            return {
                className: 'bg-red-400'
            }
        } else return {}
    }, [order, targetOrder])

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

    return (
        <Card onClick={() => setTargetOrder(order)}
              hoverable
              style={{ width: 'full' }}
              {...cardStyle}
            >
            <Flex justify="space-between" align="center" gap={20}>
                <Flex vertical className="w-3/4">
                    <p className="text-lg font-bold">Order #{order.id}</p>
                    <p>$ {order.calculated_total_price}</p>
                    <p className="opacity-60">{parsedDate.year}-{parsedDate.month}-{parsedDate.day}</p>
                    <p className="opacity-60">{parsedDate.hours}:{parsedDate.minutes < 10 ? '0' + parsedDate.minutes : parsedDate.minutes}:{parsedDate.seconds < 10 ? '0' + parsedDate.seconds : parsedDate.seconds}</p>
                </Flex>
                <EyeOutlined/>
            </Flex>
        </Card>
    )
}

export default OrderDisplay