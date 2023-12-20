import { useNavigate } from "react-router-dom";
import { Card, Flex, Tag } from "antd";

import { StoreProps } from "../../../interfaces/StoreInterface";
import { fallbackSRC } from "../../../interfaces/FoodInterface";
import { useState } from "react";

const { Meta } = Card;

const StoreDisplay = ({ store }: StoreProps) => {
    const navigate = useNavigate();

    const [storePicture, setStorePicture] = useState(store.picture_url);

    const onStoreClick = () => {
        // navigate store/:id
        navigate(`/store/${store.id}`);
    };

    return (
        <>
            <Card
                hoverable
                style={{ padding: 10 }}
                cover={
                    <img
                        alt={store.name}
                        src={storePicture}
                        className="h-[180px] object-cover"
                        onError={() => setStorePicture(fallbackSRC)}
                    />
                }
                onClick={onStoreClick}
            >
                <Flex>
                    {store.tags.map((tag, index) => (
                        <Tag key={index}>{tag.name}</Tag>
                    ))}
                </Flex>
                <Meta title={store.name} description={store.address} />
            </Card>
        </>
    );
};

export default StoreDisplay;
