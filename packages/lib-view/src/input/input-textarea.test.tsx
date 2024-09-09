import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { InputTextarea } from './input-textarea'

describe('InputTextarea', () => {
  const renderComponent = testMakeRenderComponent({ Component: InputTextarea })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent()
    expect(screen.queryByTestId('view-input-textarea')).toBeVisible()
  })
})
