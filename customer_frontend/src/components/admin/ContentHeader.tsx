import { Flex, Typography } from "antd";
const {Title, Text} = Typography


export interface ContentHeaderProps {
    icon: JSX.Element;
    name: string;
    description: string;
}

const ContentHeader = (props: ContentHeaderProps) => {
    return (
        <div className="bg-white p-2 pl-4 mt-4 mb-4">
            <Flex align="center" gap="small">
                {props.icon}
                <Title className='h-full relative top-1' level={4}>{props.name}</Title>
                <Text className='text-gray-400 text-[12px]'>{props.description}</Text>
            </Flex>
        </div>
    )
}

export default ContentHeader