import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { UIButtonGroup } from './ui-button-group'

describe('UIButtonGroup', () => {
  const renderComponent = testMakeRenderComponent({ Component: UIButtonGroup })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent()
    expect(screen.queryByTestId('view-ui-button-group')).toBeVisible()
  })
})
