import { describe, it } from "vitest";
import { render, screen }  from '@testing-library/react'
import OrderLayoutComputer from "../layout/PastFoodOrderLayout/OrderLayoutComputer";

describe('Testing components', () => {
    it('should render the OrderLayoutComputer', () => {
        render(<OrderLayoutComputer />)
        screen.debug();
    });
});