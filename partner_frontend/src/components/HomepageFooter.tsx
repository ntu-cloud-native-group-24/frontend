import { Button, Flex, Typography } from "antd"

const { Paragraph } = Typography
import { FacebookOutlined, InstagramOutlined, YoutubeOutlined } from '@ant-design/icons';

const HomepageFooter: React.FC = () => {
    return (
        <Flex vertical gap={40}>
            <Flex align='flex-end' vertical>
                <Paragraph className="text-gray-300">Company's registered name - Meal Order Cloud Native Co. Ltd <br /> Taxation registration number - 87878787 </Paragraph>
            </Flex>
            <Flex align='center' justify='space-between'>
                <Flex wrap='wrap' gap={60} align='center' justify='center'>
                    <Button size='large' shape="circle" type='default' className="bg-white" icon={<FacebookOutlined />}></Button>
                    <Button size='large' shape="circle" type='default' className="bg-white" icon={<InstagramOutlined />}></Button>
                    <Button size='large' shape="circle" type='default' className="bg-white" icon={<YoutubeOutlined />}></Button>
                </Flex>
                <Flex wrap='wrap' gap={60} align='center' justify='center'>
                    <Button size='small' type='link' className="text-gray-400">Terms and Policies</Button>
                    <Button size='small' type='link' className="text-gray-400">Privacy Notice</Button>
                </Flex>
            </Flex>
            <Flex align='center' gap={60}>
                {/* TODO: put images on here */}
                <Button>TODO</Button>
                <Button>TODO</Button>
            </Flex>
        </Flex>
    )
}

export default HomepageFooter