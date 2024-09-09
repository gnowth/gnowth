import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { InputOrdering } from './input-ordering'

describe('InputOrdering', () => {
  const renderComponent = testMakeRenderComponent({ Component: InputOrdering })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent()
    expect(screen.queryByTestId('view-input-ordering')).toBeVisible()
  })
})
