import { render, screen } from '@testing-library/react'
import App from './App'

test('should render auth links', () => {
    render(<App/>)
    // screen global object is used to access the virtual dom
    const linkElement = screen.getByRole('link', { name: 'Sign Up'})
    const linkElement1 = screen.getByRole('link', { name: 'Login'})
    expect(linkElement).toBeInTheDocument()
    expect(linkElement1).toBeInTheDocument()
})

test('should have correct button styling', () => {
    render(<App/>)
    // screen global object is used to access the virtual dom
    const colorBtn = screen.getByRole('link', { name: 'Sign Up'})
    expect(colorBtn).toHaveClass('btn-secondary btn')

    const colorBtn1 = screen.getByRole('link', { name: 'Login'})
    expect(colorBtn1).toHaveClass('btn-primary btn-sm')
})

