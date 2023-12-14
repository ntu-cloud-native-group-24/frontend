import { useNavigate } from "react-router-dom";
import { Card } from "antd";

import { FoodDisplayProps } from "../../../interfaces/FoodInterface";

const { Meta } = Card;

const FoodDisplay = ({ food }: FoodDisplayProps) => {
    const navigate = useNavigate();

    const onStoreClick = () => {
        navigate("/store/1");
    };

    return (
        <>
            <Card
                hoverable
                style={{ padding: 10 }}
                cover={
                    <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        className="h-[160px]"
                    />
                }
                onClick={onStoreClick}
            >
                <Meta title={food.name} description={`$ ${food.price}`} />
            </Card>
        </>
    );
};

export default FoodDisplay;
