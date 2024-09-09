import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { LayoutAppFooter } from './layout-app-footer'

describe('LayoutAppFooter', () => {
  const renderComponent = testMakeRenderComponent({ Component: LayoutAppFooter })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent()
    expect(screen.queryByTestId('view-layout-app-footer')).toBeVisible()
  })
})
