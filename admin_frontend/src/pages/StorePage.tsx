import { Flex, Typography } from "antd"
import StoreCard from "../components/StoreCard"
import { useEffect, useState } from "react";
import { StoreType } from "../interfaces/StoreInterface";
import { storeApi } from "../api/store";

export interface StorePageProps {
    setStoreId: React.Dispatch<React.SetStateAction<number>>;
}

const StorePage = ({ setStoreId }: StorePageProps) => {

    const [stores, setStores] = useState<StoreType[]>([]);

    const fetchStores = async () => {
        const response = await storeApi.getMyStores();
        if( response && response.status === 200 ){
            setStores(response.data.stores);
        } else {
            console.log(response);
        }
    }

    useEffect(() => {
        fetchStores();
    }, [])


    return (
        <Flex justify="center" align="center" className="bg-gray-200 w-screen min-h-screen max-h-full">
            <Flex justify="center" align="center" vertical>
                <Typography.Title level={2}>Welcome back!</Typography.Title>
                <Flex wrap='wrap' align='center' justify="center" gap={64} className="p-8">
                    {stores.map((store, index) => (
                        <StoreCard store={store} key={index} setStoreId={setStoreId} />
                    ))}
                </Flex>
            </Flex>
        </Flex>
    )
}

export default StorePage