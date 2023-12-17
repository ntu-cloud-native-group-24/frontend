import { useEffect, useState } from 'react';
import { FoodDisplayProps, fallbackSRC } from "../../interfaces/FoodInterface"
import { Card } from 'antd';
const { Meta } = Card;
import FoodModalContent from "../FoodModalContent";
import { ModalType } from '../../interfaces/ModalInterface';

const FoodDisplay = ({ food, fetchMeals, tagsList } : FoodDisplayProps) => {

    const [open, setOpen] = useState(false);
    const [foodPicture, setFoodPicture] = useState(food.picture);

    const onClickEdit = () => {
        setOpen(true);
    }

    useEffect(() => {
        setFoodPicture(food.picture);
    }, [food])

    return (
        <>
            <Card
                hoverable
                style={{ width: 240, height: 280, padding: 10 }}
                cover={<img alt={food.name} src={foodPicture} className="h-[180px]" onError={() => setFoodPicture(fallbackSRC)} />}
                onClick={onClickEdit}
                className={food.is_available ? '' : 'opacity-40'}
                key={food.key}
            >
                <Meta title={food.name} description={`$ ${food.price}`} />
            </Card>
            <FoodModalContent food={food} tagList={tagsList} type={ModalType.EDIT} open={open} setOpen={setOpen} fetchMeals={fetchMeals} />
        </>
    )
}

export default FoodDisplay