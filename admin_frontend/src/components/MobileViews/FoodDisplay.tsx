import { FoodDisplayProps, fallbackSRC } from "../../interfaces/FoodInterface";
import { useState } from 'react';
import { Card, Flex } from 'antd';
import FoodModalContent from "../FoodModalContent";
import { ModalType } from "../../interfaces/ModalInterface";

const FoodDisplay = ({ food } : FoodDisplayProps) => {

    const [open, setOpen] = useState(false);
    const [foodPicture, setFoodPicture] = useState(food.picture);

    const onClickEdit = () => setOpen(true);

    return (
        <>
            <Card hoverable style={{ width: 'full' }} onClick={onClickEdit} className={food.status ? '' : 'opacity-60'}>
                <Flex justify="space-between" align="center" gap={20}>
                    <Flex vertical className="w-1/2">
                        <p className="text-lg font-bold">{food.name}</p>
                        <p>$ {food.price}</p>
                        <p className="truncate opacity-60">{food.description}</p>
                    </Flex>
                    <img alt={food.name} src={foodPicture} width={80} height={80} onError={() => setFoodPicture(fallbackSRC)} />
                </Flex>
            </Card>
            <FoodModalContent food={food} tagList={[]} type={ModalType.EDIT} open={open} setOpen={setOpen} />
        </>
    )
}

export default FoodDisplay;