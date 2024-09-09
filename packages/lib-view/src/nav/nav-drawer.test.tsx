import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { NavDrawer } from './nav-drawer'

describe('NavDrawer', () => {
  const renderComponent = testMakeRenderComponent({ Component: NavDrawer })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent()
    expect(screen.queryByTestId('view-nav-drawer')).toBeVisible()
  })
})
