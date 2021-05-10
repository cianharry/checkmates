import { render, screen } from '@testing-library/react'
import CheckinForm from './CheckinForm'
import { Provider } from 'react-redux';

import store from '../../store'

test('default checkbox set to private', () => {
    render(<Provider store={store}><CheckinForm /></Provider>)

    const checkbox = screen.getAllByRole('checkbox')
    expect(checkbox).toBeChecked()
})