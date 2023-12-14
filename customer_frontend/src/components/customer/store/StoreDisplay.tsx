import { useNavigate } from "react-router-dom";
import { Card } from "antd";

import { RestaurantProps } from "../../../interfaces/StoreInterface";

const { Meta } = Card;

const StoreDisplay = ({ store }: RestaurantProps) => {
    const navigate = useNavigate();

    const onStoreClick = () => {
        // navigate store/:id
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
                        className="h-[180px]"
                    />
                }
                onClick={onStoreClick}
            >
                <Meta title={store.name} description={`$123`} />
            </Card>
        </>
    );
};

export default StoreDisplay;
