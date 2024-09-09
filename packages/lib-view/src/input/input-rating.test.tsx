import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { InputRating } from './input-rating'

describe('InputRating', () => {
  const renderComponent = testMakeRenderComponent({ Component: InputRating })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent()
    expect(screen.queryByTestId('view-input-rating')).toBeVisible()
  })
})
