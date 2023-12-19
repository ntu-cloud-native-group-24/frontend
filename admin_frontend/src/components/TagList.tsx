import { Space, Tag } from "antd";
import { MyTagProps } from "../interfaces/ModalInterface";

const TagList = ({ tagList }: MyTagProps) => {
    return (
        <Space wrap>
            {tagList.map((tag, index) => (
                <Tag color={tag.name.toUpperCase() === 'RECOMMEND' ? 'green' : (
                    tag.name.toUpperCase() === 'FOOD' ? 'purple' : (
                        tag.name.toUpperCase() === 'DRINK' ? 'blue' : ''
                    )
                )} key={index}>{tag.name}</Tag>
            ))}
        </Space>
    )
}

export default TagList