import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { InputEnum } from './input-enum'

describe('InputEnum', () => {
  const renderComponent = testMakeRenderComponent({ Component: InputEnum })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent()
    expect(screen.queryByTestId('view-input-enum')).toBeVisible()
  })
})
