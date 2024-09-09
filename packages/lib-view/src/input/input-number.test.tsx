import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { InputNumber } from './input-number'

describe('InputNumber', () => {
  const renderComponent = testMakeRenderComponent({ Component: InputNumber })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent()
    expect(screen.queryByTestId('view-input-number')).toBeVisible()
  })
})
