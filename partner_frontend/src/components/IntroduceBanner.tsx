import { Flex, Typography } from "antd"
import IntroduceComponent from "./IntroduceComponent"
import { IntroduceData } from "../data/IntroduceData"

const IntroduceBanner = () => {
    return (
        <Flex vertical justify="center" align="center" className="h-full w-full p-12 bg-gray-200" gap={64}>
            <Typography.Title>Why choose us?</Typography.Title>
            <div className="flex flex-row w-full items-center overflow-auto gap-12">
                {IntroduceData.map((data, i) => (
                    <IntroduceComponent key={i} picture_url={data.picture_url} title={data.title} description={data.description} />
                ))}
            </div>
        </Flex>
    )
}

export default IntroduceBanner