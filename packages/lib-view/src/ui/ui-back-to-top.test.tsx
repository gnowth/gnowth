import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { UIBackToTop } from './ui-back-to-top'

describe('UIBackToTop', () => {
  const renderComponent = testMakeRenderComponent({ Component: UIBackToTop })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent()
    expect(screen.queryByTestId('view-ui-back-to-top')).toBeVisible()
  })
})