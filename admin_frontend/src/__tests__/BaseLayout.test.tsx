import { describe, it, vi } from "vitest";
import { render, screen }  from '@testing-library/react'
import BaseLayout from "../layout/BaseLayout";
import { BrowserRouter } from "react-router-dom";

describe('Testing components', () => {
    it('should render the BaseLayout', () => {
        const login = true;
        const setLogin = vi.fn();
        render(
            <BrowserRouter>
                <BaseLayout login={login} setLogin={setLogin} />
            </BrowserRouter>
        )
        screen.debug();
    });
});