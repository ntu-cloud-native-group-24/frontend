import { Button, Input, Space, Collapse, Flex } from "antd"
import { useState, useMemo } from "react";
import { questionData } from "../data/question";

const { Search } = Input;
const onClickStyle = "bg-blue-500";
const onCloseStyle = "";
const onClickType = "primary";
const onCloseType = "default";


const HelperPage = () => {

    const [selectedButton, setSelectedButton] = useState(0)
    const [searchValue, setSearchValue] = useState('');

    const onSearch = (value: string) => { 
      if( value === undefined || value.trim().length === 0 ){
        setSelectedButton(0);
      } else {
        setSelectedButton(8877);
        setSearchValue(value);
      }
    }
    
    const onClickBtn = (value: number) => setSelectedButton(value);

    const items = useMemo(() => {
      if( selectedButton !== 8877 ){
        return questionData[selectedButton].panels.map((q, i) => {
          return {
            key: i,
            label: q.title,
            children: q.description
          }
        });
      } else {
        return questionData.filter((q) => q.section.search(searchValue) !== -1).flatMap((q) => {
          return q.panels.map((p, i) => {
            return {
              key: i,
              label: p.title,
              children: p.description
            }
          })
        })
      }
    }, [selectedButton, searchValue])

    return (
        <Flex vertical justify="space-evenly" className="h-full">
            <div className="flex flex-col justify-center gap-5">
                <Search placeholder="input search text" onSearch={onSearch} allowClear />
                <Space wrap>
                  {
                    questionData.map((question, i) => (
                      <Button type={selectedButton === i ? onClickType : onCloseType} 
                            className={selectedButton === i ? onClickStyle : onCloseStyle} 
                            key={i}
                            onClick={() => onClickBtn(i)}
                      >
                        {question.section}
                      </Button>
                    ))
                  }
                </Space>
                <Collapse accordion items={items} />
            </div>
        </Flex>
    )
}

export default HelperPage