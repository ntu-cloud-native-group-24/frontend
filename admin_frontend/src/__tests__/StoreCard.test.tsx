import { describe, it, vi } from "vitest";
import { render, screen }  from '@testing-library/react'
import StoreCard from "../components/StoreCard";
import { StoreType } from "../interfaces/StoreInterface";
import { BrowserRouter } from "react-router-dom";

describe('Store Card Rendering', () => {
    it('should render the StoreCard', () => {
        const store: StoreType = {
            id: 1,
            name: "Test Store",
            address: "123 Test Street",
            description: 'Test Description',
            status: true,
            phone: "123-456-7890",
            email: "",
            picture_url: '',
        }
        const setStore = vi.fn();
        render(
            <BrowserRouter>
                <StoreCard store={store} setStoreId={setStore} />
            </BrowserRouter>
        )
        screen.debug();
    });
});