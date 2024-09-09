import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { UIToast } from './ui-toast'

describe('UIToast', () => {
  const renderComponent = testMakeRenderComponent({ Component: UIToast })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent()
    expect(screen.queryByTestId('view-ui-toast')).toBeVisible()
  })
})
