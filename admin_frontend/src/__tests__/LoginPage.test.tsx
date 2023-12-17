import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import LoginPage from "../pages/LoginPage";
import { BrowserRouter } from "react-router-dom";

describe('LoginPage', () => {
    it('should render the LoginPage', () => {
        const mockLogin = true;
        const mockSetLogin = vi.fn();
        render(
            <BrowserRouter>
               <LoginPage login={mockLogin} setLogin={mockSetLogin} /> 
            </BrowserRouter>
        )
        screen.debug();
    });

    it('should shows two input box and login Button', () => {
        const mockLogin = true;
        const mockSetLogin = vi.fn();

        render(
            <BrowserRouter>
                <LoginPage login={mockLogin} setLogin={mockSetLogin} />
            </BrowserRouter>
        )
        
        expect(screen.getByTestId('username-input')).toBeInTheDocument();
        expect(screen.getByTestId('password-input')).toBeInTheDocument();
        expect(screen.getByTestId('btn-input')).toBeInTheDocument();
    })

    it('should show notification when invalid input', () => {
        //anticon anticon-exclamation-circle
        const mockLogin = true;
        const mockSetLogin = vi.fn();

        render(
            <BrowserRouter>
                <LoginPage login={mockLogin} setLogin={mockSetLogin} />
            </BrowserRouter>
        )

        // test click login without typing anything
        fireEvent.click(screen.getByTestId('btn-input'));
        expect(screen.getByText('Please input username or password!')).toBeInTheDocument();
        
    })

    it('should NOT setLogin when failed login', async () => {
        const mockLogin = true;
        const mockSetLogin = vi.fn(); 

        render(
            <BrowserRouter>
                <LoginPage login={mockLogin} setLogin={mockSetLogin} />
            </BrowserRouter>
        )

        // test click login with valid input, but invalid crendentials
        fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'test' } });
        fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'test' } });
        fireEvent.click(screen.getByTestId('btn-input'));
        
        await waitFor(() => {
            expect(mockSetLogin).toBeCalledTimes(0);    
        })

    })

    it('should setLogin when successfully login', async () => {
        const mockLogin = true;
        const mockSetLogin = vi.fn();

        render(
            <BrowserRouter>
                <LoginPage login={mockLogin} setLogin={mockSetLogin} />
            </BrowserRouter>
        )

        // test click login with valid input and valid crendentials
        fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'wzwr1029' } });
        fireEvent.change(screen.getByTestId('password-input'), { target: { value: '123123123123' } });
        fireEvent.click(screen.getByTestId('btn-input'));

        await waitFor(() => {
            expect(mockSetLogin).toHaveBeenCalledOnce();
        })
    })

    
})