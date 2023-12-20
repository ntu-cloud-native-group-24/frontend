
import { describe, it } from "vitest";
import { render, screen }  from '@testing-library/react'
import TagList from "../components/TagList";
import { FoodCategory } from "../interfaces/FoodInterface";

describe('Testing components', () => {
    it('should render the TagList', () => {
        const tagList: FoodCategory[] = [
            {
                id: 1,
                name: "Test"
            },
            {
                id: 2,
                name: "Test2"
            },
            {
                id: 3,
                name: "Test3"
            },
            {
                id: 4,
                name: 'RECOMMEND',
            },
            {
                id: 5,
                name: 'FOOD',
            },
            {
                id: 6,
                name: 'DRINK'
            }
        ]
        render(<TagList tagList={tagList} />)
        screen.debug();
    });
});