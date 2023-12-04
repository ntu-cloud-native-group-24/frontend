import { useMemo, useState } from "react";
import { RestaurantProps, SortType } from "../../interfaces/StoreInterface";
import { Layout, Typography, Badge } from "antd";
import RestaurantContent from "../../components/RestaurantContent";
import FoodFilter from "../../components/FoodFilter";

const { Header, Sider, Content } = Layout;

// backgroundURLClass = URL

const ComputerRestaurantPage = ({ store, foods } : RestaurantProps ) => {
    const [collapsed, setCollapsed] = useState(true);

    /*
    const foodMaxPrice = useMemo(() => {
        return foods.reduce((prev, current) => (prev.price > current.price ? prev : current)).price;
    }, [foods])
    // Search Filter
    // Sort 
    // Price
    // Filter
    // Filter Tags
    // TODO: danger zone -- Restaurant status
    const [searchValue, setSearchValue] = useState('');
    const [sortValue, setSortValue] = useState(SortType.NONE);
    const [priceRange, setPriceRange] = useState([0, foodMaxPrice])
    const [filterArray, setFilterArray] = useState([]);
    const [filterTags, setFilterTags] = useState([]);
    */

    const backgroundURLClass = useMemo(() => {
        return `bg-[url('${store.picture_url}')]`;
    }, [store])

    return (
        <Layout className='w-full'>
            <Header className={backgroundURLClass} />
            <Layout hasSider>
                <Content className="bg-white">
                    <div className="flex flex-col justify-center items-center">
                        <Typography.Title className="flex flex-row justify-center pt-4">{store.name}</Typography.Title>
                        <Badge status={store.status ? 'success' : 'default' } text={store.status ? 'OPENING' : 'CLOSE'} />
                    </div>
                    <RestaurantContent foods={foods} />
                </Content>
                <Sider reverseArrow collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <FoodFilter collapsed={collapsed}/>
                </Sider>
            </Layout>
        </Layout>
    )
}

export default ComputerRestaurantPage;