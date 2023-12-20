import { describe, it,  } from "vitest";
import { render, screen }  from '@testing-library/react'
import MobileRestaurantPage from "../pages/RestaurantSubPage/MobileRestaurantPage";

describe('FoodManagement', () => {
    it('should render the FoodManagementPage', () => {
        render(<MobileRestaurantPage />)
        screen.debug();
    });
});