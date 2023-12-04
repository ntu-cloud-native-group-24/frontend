import { useState } from 'react';
import { FoodDisplayProps, fallbackSRC } from "../interfaces/FoodInterface"
import { Card } from 'antd';
const { Meta } = Card;
import FoodModalContent from "../components/FoodModalContent";
import { ModalType } from '../interfaces/ModalInterface';

const FoodDisplay = ({ food } : FoodDisplayProps) => {

    const [open, setOpen] = useState(false);
    const [foodPicture, setFoodPicture] = useState(food.picture);

    const onClickEdit = () => {
        setOpen(true);
    }

    return (
        <>
            <Card
                hoverable
                style={{ width: 240, height: 280, padding: 10 }}
                cover={<img alt={food.name} src={foodPicture} className="h-[180px]" onError={() => setFoodPicture(fallbackSRC)} />}
                onClick={onClickEdit}
                className={food.status ? '' : 'bg-gray-300'}
            >
                <Meta title={food.name} description={`$ ${food.price}`} />
            </Card>
            <FoodModalContent food={food} tagList={[]} type={ModalType.EDIT} open={open} setOpen={setOpen} />
        </>
    )
}

export default FoodDisplay