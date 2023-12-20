import { describe, it,  } from "vitest";
import { render, screen }  from '@testing-library/react'
import RestaurantPage from "../pages/RestaurantPage";

describe('FoodManagement', () => {
    it('should render the FoodManagementPage', () => {
        render(<RestaurantPage />)
        screen.debug();
    });
});