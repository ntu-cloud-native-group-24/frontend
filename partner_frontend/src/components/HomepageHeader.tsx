import { Button, Flex, Space, Typography } from 'antd';

const { Title, Text } = Typography
import { GlobalOutlined, UserOutlined } from '@ant-design/icons';

const HomepageHeader: React.FC = () => {

    const redirectLogin = () => {
        //TODO: 
        console.log('go login');
    }

    return (
        <Flex align="center" justify='space-between' className='bg-white'>
            <Space>
                <Title className='h-full relative top-1' level={3}>Meal Order</Title>
                <Text className='text-gray-400'>For partner</Text>
            </Space>
            <Flex wrap="wrap" gap="small" align="center" justify='center'>
                <Button type="default" icon={<GlobalOutlined />}>EN</Button>
                <Button onClick={redirectLogin} type="default" icon={<UserOutlined />}>Log in</Button>
            </Flex>
        </Flex>
    )
}

export default HomepageHeader