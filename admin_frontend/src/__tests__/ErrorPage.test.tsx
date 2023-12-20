import { describe, it } from "vitest";
import { render, screen }  from '@testing-library/react'
import ErrorPage from "../pages/ErrorPage";

describe('Error Routing Handling', () => {
    it('should render the ErrorPage', () => {
        render(<ErrorPage />)
        screen.debug();
    });
});