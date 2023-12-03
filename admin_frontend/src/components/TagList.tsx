import { Space, Input, Tag, theme, Tooltip } from "antd";
import type { InputRef } from 'antd';
import { MyTagProps } from "../interfaces/ModalInterface";
import React, { useState, useEffect, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';

const TagList = ({ tagList, setTagList, fullTagList, setFullTagList }: MyTagProps) => {
    const { token } = theme.useToken();
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [editInputIndex, setEditInputIndex] = useState(-1);
    const [editInputValue, setEditInputValue] = useState('');
    const inputRef = useRef<InputRef>(null);
    const editInputRef = useRef<InputRef>(null);

    const tagInputStyle: React.CSSProperties = {
        width: 64,
        height: 22,
        marginInlineEnd: 8,
        verticalAlign: 'top',
    };
    
    const tagPlusStyle: React.CSSProperties = {
        height: 22,
        background: token.colorBgContainer,
        borderStyle: 'dashed',
    };

    useEffect(() => {
        if (inputVisible) {
          inputRef.current?.focus();
        }
    }, [inputVisible]);

    useEffect(() => {
        editInputRef.current?.focus();
    }, [editInputValue]);

    const showInput = () => {
        setInputVisible(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditInputValue(e.target.value);
    };

    const handleInputConfirm = () => {
        if (inputValue && !tagList.includes(inputValue)) {
          setTagList([...tagList, inputValue]);
          setFullTagList([...fullTagList, inputValue]);
        }
        setInputVisible(false);
        setInputValue('');
    };

    const handleClose = (removedTag: string) => {
        const newTags = tagList.filter((tag) => tag !== removedTag);
        const newFullTags = fullTagList.filter((tag) => tag !== removedTag);
        console.log(newTags);
        setTagList(newTags);
        setFullTagList(newFullTags);
    };

    const handleEditInputConfirm = () => {
        const newTags = [...tagList];
        const newFullTags = [...fullTagList];
        newTags[editInputIndex] = editInputValue;
        setTagList(newTags);
        setFullTagList(newFullTags);
        setEditInputIndex(-1);
        setEditInputValue('');
    };

    return (
        <Space wrap>
            {tagList.map((tag, index) => {
                if (editInputIndex === index) {
                return (
                    <Input
                    ref={editInputRef}
                    key={tag}
                    size="small"
                    style={tagInputStyle}
                    value={editInputValue}
                    onChange={handleEditInputChange}
                    onBlur={handleEditInputConfirm}
                    onPressEnter={handleEditInputConfirm}
                    />
                );
                }
                const isLongTag = tag.length > 20;
                const tagElem = (
                <Tag
                    key={tag}
                    closable={true}
                    style={{ userSelect: 'none' }}
                    onClose={() => handleClose(tag)}
                    color={tag.toUpperCase() === 'RECOMMEND' ? 'green' : (tag.toUpperCase() === 'FOOD' ? 'orange' : (tag.toUpperCase() === 'DRINK' ? 'blue' : ''))}
                >
                    <span
                    onDoubleClick={(e) => {
                        setEditInputIndex(index);
                        setEditInputValue(tag);
                        e.preventDefault();
                    }}
                    >
                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                    </span>
                </Tag>
                );
                return isLongTag ? (
                <Tooltip title={tag} key={tag}>
                    {tagElem}
                </Tooltip>
                ) : (
                tagElem
                );
            })}
            {inputVisible ? (
                <Input
                ref={inputRef}
                type="text"
                size="small"
                style={tagInputStyle}
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
                />
            ) : (
                <Tag style={tagPlusStyle} icon={<PlusOutlined />} onClick={showInput}>
                New Tag
                </Tag>
            )}
        </Space>
    )
}

export default TagList