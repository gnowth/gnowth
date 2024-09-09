import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { NavMenu } from './nav-menu'

describe('NavMenu', () => {
  const renderComponent = testMakeRenderComponent({ Component: NavMenu })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent()
    expect(screen.queryByTestId('view-nav-menu')).toBeVisible()
  })
})
