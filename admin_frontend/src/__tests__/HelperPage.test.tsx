import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from '@testing-library/react'
import HelperPage from "../pages/HelperPage";
import { questionData } from "../data/question";

describe('HelperPage', () => {
    it('should render the HelperPage', () => {
        render(<HelperPage />);
        screen.debug();
    });

    it('test button functionality', () => {
        const { container } = render(<HelperPage />);

        const btnList = screen.getAllByTestId('btn-question');
        expect(btnList.length).toBe(questionData.length);

        // for all the buttons
        btnList.forEach((btn, i) => {
            // 1. click the button
            fireEvent.click(btn);
            // 2. check the question data is proper rendered
            questionData[i].panels.forEach((q, j) => {
                expect(container.getElementsByClassName('ant-collapse-header-text')[j].textContent).toBe(q.title);
            })
        })
        
    });

    it('should show search bar', () => {
        render(<HelperPage />);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    })
})