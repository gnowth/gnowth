import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { LayoutAppHeader } from './layout-app-header'

describe('LayoutAppHeader', () => {
  const renderComponent = testMakeRenderComponent({ Component: LayoutAppHeader })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent()
    expect(screen.queryByTestId('view-layout-app-header')).toBeVisible()
  })
})
