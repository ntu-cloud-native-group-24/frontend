import { Collapse, CollapseProps, Flex, Typography } from "antd"
import { FAQData } from "../data/FAQdata"
import { useMemo } from "react"

const FAQBanner = () => {

    const items: CollapseProps['items'] = useMemo(() => {
        return FAQData.map((data, i) => {
            return {
                key: i,
                label: data.title,
                children: <p>{data.description}</p>
            }
        })
    }, [])

    return (
        <Flex vertical justify="center" align="center" className="p-12 bg-white">
            <Typography.Title>FAQs</Typography.Title>
            <Collapse items={items} className="w-full"/>
        </Flex>
    )
}

export default FAQBanner