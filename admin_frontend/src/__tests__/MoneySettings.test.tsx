import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react'
import MoneySettings from "../pages/Settings/MoneySettings";

describe('MoneySettingsPage', () => {
    it('should render the MoneySettingsPage', () => {
        render(<MoneySettings />);
        screen.debug();
    });

    it('should exists required input', () => {
        render(<MoneySettings />);
        expect(screen.getByTestId('input-name')).toBeInTheDocument();
        expect(screen.getByTestId('input-id')).toBeInTheDocument();
        expect(screen.getByTestId('input-code')).toBeInTheDocument();
        expect(screen.getByTestId('input-subcode')).toBeInTheDocument();
        expect(screen.getByTestId('input-account')).toBeInTheDocument();
        expect(screen.getByTestId('btn-clear')).toBeInTheDocument();
    })
})