import { describe, it, vi } from "vitest";
import { render, screen }  from '@testing-library/react'
import StorePage from "../pages/StorePage";

describe('After login, choose Store', () => {
    it('should render the StorePage', () => {
        const mockProps =  vi.fn()
        render(<StorePage setStoreId={mockProps}/>)
        screen.debug();
    });
});