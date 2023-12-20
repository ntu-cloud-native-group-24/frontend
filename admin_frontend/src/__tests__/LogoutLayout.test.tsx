import { describe, it, expect } from "vitest";
import { fireEvent, render, screen, }  from '@testing-library/react'
import LogoutLayout from "../layout/LogoutLayout";
import { BrowserRouter } from "react-router-dom";

describe('Testing components', () => {
    it('should render the LogoutLayout', () => {
        render(<BrowserRouter><LogoutLayout /></BrowserRouter>)
        expect(screen.getByTestId('logout-btn')).toBeInTheDocument();
        fireEvent.click(screen.getByTestId('logout-btn'));
        screen.debug();
    });
});