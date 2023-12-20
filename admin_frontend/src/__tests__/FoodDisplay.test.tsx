import { describe, it, vi } from "vitest";
import { render, screen }  from '@testing-library/react'
import FoodDisplay from "../components/ComputerViews/FoodDisplay";
import { FoodCategory, FoodType } from "../interfaces/FoodInterface";


describe('FoodManagement', () => {
    it('should render the FoodManagementPage', () => {
        const food: FoodType = {
            id: 1,
            key: 1,
            name: "test",
            description: "test",
            price: 1,
            picture: '',
            is_available: true,
            customizations: {selectionGroups: []},
            categories: [],
            soldAmount: 0,
        };
        const tagsList: FoodCategory[] = [];
        const fetchMeals = vi.fn();
        render(<FoodDisplay food={food} tagsList={tagsList} fetchMeals={fetchMeals}/>)
        screen.debug();
    });
});