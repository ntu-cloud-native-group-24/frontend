import { Button, Flex, Typography } from "antd";

const { Paragraph } = Typography;
import {
    FacebookOutlined,
    InstagramOutlined,
    YoutubeOutlined,
} from "@ant-design/icons";

const CustomerPageFooter = () => {
    return (
        <Flex vertical gap={5}>
            <Flex align="center" justify="space-between">
                <Flex wrap="wrap" gap={10} align="center" justify="center">
                    <Button
                        size="large"
                        shape="circle"
                        type="default"
                        className="bg-white"
                        icon={<FacebookOutlined />}
                    ></Button>
                    <Button
                        size="large"
                        shape="circle"
                        type="default"
                        className="bg-white"
                        icon={<InstagramOutlined />}
                    ></Button>
                    <Button
                        size="large"
                        shape="circle"
                        type="default"
                        className="bg-white"
                        icon={<YoutubeOutlined />}
                    ></Button>
                </Flex>
                <Flex wrap="wrap" gap={60} align="center" justify="center">
                    <Paragraph className="text-gray-300">
                        Company's registered name - Meal Order Cloud Native Co.
                        Ltd <br /> Taxation registration number - 87878787{" "}
                    </Paragraph>
                </Flex>
            </Flex>
            <Flex align="center" justify="space-between">
                <Flex wrap="wrap" gap={10} align="center" justify="center">
                    <a href="#google-play">
                        <img
                            alt="googleplay"
                            src="https://freepngimg.com/download/android/67006-app-play-google-android-store-free-clipart-hd.png"
                            width={128}
                            height={128}
                        ></img>
                    </a>
                    <a href="#apple-play">
                        <img
                            alt="googleplay"
                            src="https://digitopoly.files.wordpress.com/2016/06/app-store-logo.png"
                            width={128}
                            height={128}
                        ></img>
                    </a>
                </Flex>
                <Flex wrap="wrap" gap={10} align="center" justify="center">
                    <Button size="small" type="link" className="text-gray-400">
                        Terms and Policies
                    </Button>
                    <Button size="small" type="link" className="text-gray-400">
                        Privacy Notice
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default CustomerPageFooter;
