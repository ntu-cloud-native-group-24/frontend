import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react'
import RestaurantSettings from "../pages/Settings/RestaurantSettings";

describe('RestaurantSettingsPage', () => {
    it('should render the RestaurantSettingsPage', () => {
        render(<RestaurantSettings />);
        screen.debug();
    });

    it('should exists required input', () => {
        render(<RestaurantSettings />);
        expect(screen.getByTestId('input-name')).toBeInTheDocument();
        expect(screen.getByTestId('input-address')).toBeInTheDocument();
        expect(screen.getByTestId('input-desc')).toBeInTheDocument();
        expect(screen.getByTestId('input-phone')).toBeInTheDocument();
        expect(screen.getByTestId('input-email')).toBeInTheDocument();
        expect(screen.getByTestId('input-status')).toBeInTheDocument();
        expect(screen.getByTestId('btn-clean')).toBeInTheDocument();
        expect(screen.getByTestId('btn-submit')).toBeInTheDocument();
    })
})