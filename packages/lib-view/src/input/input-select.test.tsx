import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { InputSelect } from './input-select'

describe('InputSelect', () => {
  const renderComponent = testMakeRenderComponent({ Component: InputSelect })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent()
    expect(screen.queryByTestId('view-input-select')).toBeVisible()
  })
})
