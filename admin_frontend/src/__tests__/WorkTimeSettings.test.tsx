import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react'
import WorkTimeSettings from "../pages/Settings/WorkTimeSettings";

describe('WorkTimeSettingsPage', () => {
    it('should render the WorkTimeSettingsPage', () => {
        render(<WorkTimeSettings />);
        screen.debug();
    });

    it('should exists required input', () => {
        render(<WorkTimeSettings />);
        expect(screen.getByTestId('input-day')).toBeInTheDocument();
        expect(screen.getByTestId('input-time-picker')).toBeInTheDocument();
        expect(screen.getByTestId('btn-clear')).toBeInTheDocument();
        expect(screen.getByTestId('btn-submit')).toBeInTheDocument();
    })
})