import React from 'react';
import { Layout } from 'antd';
import HomepageHeader from '../components/HomepageHeader';
import HomepageFooter from '../components/HomepageFooter';

const { Header, Footer, Content } = Layout;


const HomepageLayout: React.FC = () => {

    return (
        <Layout>
            <Header className='bg-white mt-2 mb-2'>
                <HomepageHeader />
            </Header>
            <Content className='bg-blue-300'>Content</Content>
            <Content className='bg-blue-300'>Content</Content>
            <Content className='bg-blue-300'>Content</Content>
            <Footer className='bg-[#292A2B]'>
                <HomepageFooter />
            </Footer>
        </Layout>
    )
}
  
export default HomepageLayout
  