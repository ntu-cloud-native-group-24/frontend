import { describe, it } from "vitest";
import { render, screen }  from '@testing-library/react'
import UnAuthPage from "../pages/UnAuthPage";

describe('Unauthenticated Routing Handling', () => {
    it('should render the UnAuthPage', () => {
        render(<UnAuthPage />)
        screen.debug();
    });
});