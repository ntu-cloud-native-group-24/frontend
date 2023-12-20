import { describe, it, vi } from "vitest";
import { render, screen }  from '@testing-library/react'
import OrderDisplay from "../components/ComputerViews/OrderDisplay";
import { OrderType } from "../interfaces/OrderInterface";


describe('FoodManagement', () => {
    it('should render the FoodManagementPage', () => {

        const order: OrderType = {
            id: 1,
            user_id: 1,
            store_id: 1,
            notes: '',
            payment_type: 'cash',
            delivery_method: 'delivery',
            state: 'pending',
            created_at: 'asdf',
            calculated_total_price: 1,
        }

        const fetchOrders = vi.fn();
        render(<OrderDisplay order={order} targetOrder={order} setTargetOrder={fetchOrders}/>)
        screen.debug();
    });

    it('should render the FoodManagementPage', () => {

        const order: OrderType = {
            id: 1,
            user_id: 1,
            store_id: 1,
            notes: '',
            payment_type: 'cash',
            delivery_method: 'delivery',
            state: 'pending',
            created_at: 'asdf',
            calculated_total_price: 1,
        }

        const fetchOrders = vi.fn();
        render(<OrderDisplay order={order} targetOrder={undefined} setTargetOrder={fetchOrders}/>)
        screen.debug();
    });
});