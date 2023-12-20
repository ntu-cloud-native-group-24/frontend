import { describe, it, vi } from "vitest";
import { render, screen }  from '@testing-library/react'
import RestaurantContent from "../components/MobileViews/RestaurantContent";
import { FoodCategory, FoodType } from "../interfaces/FoodInterface";


describe('FoodManagement', () => {
    it('should render the FoodManagementPage', () => {
        const food: FoodType[] = [{
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
        },{
            id: 2,
            key: 2,
            name: "test2",
            description: "test2",
            price: 2,
            picture: '',
            is_available: true,
            customizations: {selectionGroups: []},
            categories: [],
            soldAmount: 0,
        }];
        const tagsList: FoodCategory[] = [];
        const isInFilter = true;
        const fetchMeals = vi.fn();
        render(<RestaurantContent isInFilter={isInFilter} foods={food} tagsList={tagsList} fetchMeals={fetchMeals}/>)
        screen.debug();
    });

    it('should render the FoodManagementPage', () => {
        const food: FoodType[] = [{
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
        },{
            id: 2,
            key: 2,
            name: "test2",
            description: "test2",
            price: 2,
            picture: '',
            is_available: true,
            customizations: {selectionGroups: []},
            categories: [],
            soldAmount: 0,
        }];
        const tagsList: FoodCategory[] = [];
        const isInFilter = false;
        const fetchMeals = vi.fn();
        render(<RestaurantContent isInFilter={isInFilter} foods={food} tagsList={tagsList} fetchMeals={fetchMeals}/>)
        screen.debug();
    });
});