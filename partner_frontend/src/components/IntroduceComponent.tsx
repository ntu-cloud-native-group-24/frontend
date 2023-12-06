import { Avatar, Card, Flex, Typography } from "antd";
import type { IntroduceProps } from "../data/IntroduceData";

const IntroduceComponent = ({ picture_url, title, description } : IntroduceProps) => {
    return (
        <Card 
            title={(<Avatar src={picture_url} className="relative m-4 left-16 w-[64px] h-[64px]"/>)}
        >
            <Flex vertical className="w-[14rem] h-[10rem]" justify="center" align="center" gap="small">
                <Typography.Text style={{fontSize: 16}}>{title}</Typography.Text>
                <p className="opacity-60 text-center">{description}</p>
            </Flex>
        </Card>
    )
}

export default IntroduceComponent