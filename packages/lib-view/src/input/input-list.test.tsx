import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { InputList } from './input-list'

describe('InputList', () => {
  const renderComponent = testMakeRenderComponent({ Component: InputList })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent()
    expect(screen.queryByTestId('view-input-list')).toBeVisible()
  })
})
