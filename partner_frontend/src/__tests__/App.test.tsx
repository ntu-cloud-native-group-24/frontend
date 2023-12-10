import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest'
import App from '../App';

describe('App', () => {
  test('檢查h1元素', () => {
    render(<App />)
    const h1Element = screen.getByRole('heading', { name: 'Vite + React' })
    console.log(h1Element);
    expect(h1Element).toBeInTheDocument()
  });
});