import { describe, it } from "vitest";
import { render, screen }  from '@testing-library/react'
import PageFooter from "../components/PageFooter";

describe('Testing components', () => {
    it('should render the PageFooter', () => {
        render(<PageFooter />)
        screen.debug();
    });
});