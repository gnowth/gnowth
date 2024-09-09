import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { InputSwitch } from './input-switch'

describe('InputSwitch', () => {
  const renderComponent = testMakeRenderComponent({ Component: InputSwitch })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent()
    expect(screen.queryByTestId('view-input-switch')).toBeVisible()
  })
})
