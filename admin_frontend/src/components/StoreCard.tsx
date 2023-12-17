
import { Card } from "antd";
import type { StoreType } from "../interfaces/StoreInterface";
import { fallbackSRC } from "../interfaces/FoodInterface";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;
export interface StoreProps {
    store: StoreType;
    setStoreId: React.Dispatch<React.SetStateAction<number>>;
}

const StoreCard = ({ store, setStoreId } : StoreProps) => {
    const [storePicture, setStorePicture ] = useState(store.picture_url);
    const navigate = useNavigate();
    
    const onClickStore = () => {
        localStorage.setItem('storeId', store.id.toString());
        setStoreId(store.id);
        navigate('/');
    }

    return (
        <Card
            hoverable
            style={{width: 240, height: 240, padding: 0}}
            cover={<img alt={store.name} src={storePicture} className="h-[70px]" onError={() => setStorePicture(fallbackSRC)} />}
            onClick={onClickStore}
        >
            <Meta title={store.name} description={store.address} />
        </Card>
    )
}

export default StoreCard;