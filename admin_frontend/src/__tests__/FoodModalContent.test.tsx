import { describe, it, vi } from "vitest";
import { render, screen }  from '@testing-library/react'
import FoodModalContent from "../components/FoodModalContent";
import { FoodCategory, FoodType } from "../interfaces/FoodInterface";
import { ModalType } from "../interfaces/ModalInterface";

describe('Testing components', () => {
    it('should render the FoodModalContent', () => {
        const food: FoodType = {
            id: 1,
            key: 1,
            name: "Test",
            description: "Test",
            price: 1,
            picture: "Test",
            is_available: true,
            customizations: {
                selectionGroups: []
            },
            categories: [],
            soldAmount: 1
        }
        const open = true;
        const setOpen = vi.fn();
        const fetchMeals = vi.fn();
        render(<FoodModalContent food={food} tagList={[]} type={ModalType.NEW} open={open} setOpen={setOpen} fetchMeals={fetchMeals} />)
        screen.debug();
    });

    it('should render the FoodModalContent', () => {
        const food: FoodType = {
            id: 1,
            key: 1,
            name: "Test",
            description: "Test",
            price: 1,
            picture: "Test",
            is_available: true,
            customizations: {
                selectionGroups: []
            },
            categories: [],
            soldAmount: 1
        }
        const open = true;
        const setOpen = vi.fn();
        const fetchMeals = vi.fn();
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
                name: "Test4"
            },
        ]
        render(<FoodModalContent food={food} tagList={tagList} type={ModalType.EDIT} open={open} setOpen={setOpen} fetchMeals={fetchMeals} />)
        screen.debug();
    });
});