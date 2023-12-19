import { useNavigate } from "react-router-dom";
import { Card } from "antd";

import {
    FoodDisplayProps,
    fallbackSRC,
} from "../../../interfaces/FoodInterface";
import { useState } from "react";

const { Meta } = Card;

const FoodDisplay = ({ food, store }: FoodDisplayProps) => {
    const navigate = useNavigate();

    const [foodPicture, setFoodPicture] = useState(food.picture);

    const onFoodClick = () => {
        navigate(`/store/${store.id}/${food.id}`);
    };

    return (
        <>
            <Card
                hoverable
                style={{ padding: 10 }}
                cover={
                    <img
                        alt={food.name}
                        src={foodPicture}
                        className="h-[180px] object-cover"
                        onError={() => setFoodPicture(fallbackSRC)}
                    />
                }
                onClick={onFoodClick}
            >
                <Meta title={food.name} description={`$ ${food.price}`} />
            </Card>
        </>
    );
};

export default FoodDisplay;
