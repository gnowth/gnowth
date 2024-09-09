import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { InputSlider } from './input-slider'

describe('InputSlider', () => {
  const renderComponent = testMakeRenderComponent({ Component: InputSlider })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent()
    expect(screen.queryByTestId('view-input-slider')).toBeVisible()
  })
})
