import { describe, it, expect } from "vitest";
import { render, screen }  from '@testing-library/react'
import FoodManagement from "../pages/FoodManagement";

describe('FoodManagement', () => {
    it('should render the FoodManagementPage', () => {
        render(<FoodManagement />)
        screen.debug();
    });

    it('should shows search bar, Add food Button, Edit Category button, Clear Filter Button and Table to show meals', () => {
        render(<FoodManagement />)
        expect(screen.getByTestId('search-bar')).toBeInTheDocument();
        expect(screen.getByTestId('add-food-btn')).toBeInTheDocument();
        expect(screen.getByTestId('edit-category-btn')).toBeInTheDocument();
        expect(screen.getByTestId('clear-filter-btn')).toBeInTheDocument();
        expect(screen.getByTestId('food-management-table')).toBeInTheDocument();
    })
});