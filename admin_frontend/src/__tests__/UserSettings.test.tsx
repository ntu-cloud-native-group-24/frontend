import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react'
import UserSettings from "../pages/Settings/UserSettings";

describe('UserSettingsPage', () => {
    it('should render the UserSettingsPage', () => {
        render(<UserSettings />);
        screen.debug();
    });

    it('should exists required input', () => {
        render(<UserSettings />);
        expect(screen.getByTestId('input-name')).toBeInTheDocument();
        expect(screen.getByTestId('input-mail')).toBeInTheDocument();
        expect(screen.getByTestId('input-old-password')).toBeInTheDocument();
        expect(screen.getByTestId('input-new-password')).toBeInTheDocument();
        expect(screen.getByTestId('input-confirm-password')).toBeInTheDocument();
        expect(screen.getByTestId('btn-clear')).toBeInTheDocument();
        expect(screen.getByTestId('btn-submit')).toBeInTheDocument();  
    })
})