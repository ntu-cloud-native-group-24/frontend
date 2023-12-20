import { describe, it } from "vitest";
import { render, screen }  from '@testing-library/react'
import PastFoodOrder from "../pages/FoodOrder/PastFoodOrder";

describe('FoodManagement', () => {
    it('should render the FoodManagementPage', () => {
        render(<PastFoodOrder />)
        screen.debug();
    });
});