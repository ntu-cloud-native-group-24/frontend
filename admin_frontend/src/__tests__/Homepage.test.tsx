import { describe, it } from "vitest";
import { render, screen }  from '@testing-library/react'
import Homepage from "../pages/Homepage";

describe('FoodManagement', () => {
    it('should render the FoodManagementPage', () => {
        render(<Homepage />)
        screen.debug();
    });
});