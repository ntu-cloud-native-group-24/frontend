import { describe, it } from "vitest";
import { render, screen }  from '@testing-library/react'
import TodayFoodOrder from "../pages/FoodOrder/TodayFoodOrder";


describe('FoodManagement', () => {
    it('should render the FoodManagementPage', () => {
        render(<TodayFoodOrder />)
        screen.debug();
    });
});