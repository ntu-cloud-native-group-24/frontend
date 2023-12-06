import React from 'react';
import { Flex, Layout } from 'antd';
import HomepageHeader from '../components/HomepageHeader';
import HomepageFooter from '../components/HomepageFooter';
import SignupBanner from '../components/SignupBanner';
import IntroduceBanner from '../components/IntroduceBanner';
import FAQBanner from '../components/FAQBanner';

const { Header, Footer, Content } = Layout;


const HomepageLayout: React.FC = () => {

    return (
        <Layout>
            <Header className='bg-white mt-2 mb-2'>
                <HomepageHeader />
            </Header>
            <Content className='bg-blue-300 min-h-screen max-h-full'>
                <Flex vertical gap={0}>
                    <SignupBanner />
                    <IntroduceBanner />
                    <FAQBanner />
                </Flex>
            </Content>
            <Footer className='bg-[#292A2B]'>
                <HomepageFooter />
            </Footer>
        </Layout>
    )
}
  
export default HomepageLayout
  