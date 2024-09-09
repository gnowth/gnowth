import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { NavBreadcrumb } from './nav-breadcrumb'

describe('NavBreadcrumb', () => {
  const renderComponent = testMakeRenderComponent({ Component: NavBreadcrumb })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent()
    expect(screen.queryByTestId('view-nav-breadcrumb')).toBeVisible()
  })
})
