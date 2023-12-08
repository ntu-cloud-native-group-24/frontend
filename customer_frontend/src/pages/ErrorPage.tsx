import { Flex, Result } from "antd";

const ErrorPage = () => {
    return (
        <Flex className="h-screen w-100" justify="center" align="center">
            <Result
                status="404"
                title="404"
                subTitle="Not exists such page QAQ"
            />
        </Flex>
    );
};

export default ErrorPage;
