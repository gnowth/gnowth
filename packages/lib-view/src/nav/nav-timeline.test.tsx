import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { NavTimeline } from './nav-timeline'

describe('NavTimeline', () => {
  const renderComponent = testMakeRenderComponent({ Component: NavTimeline })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent()
    expect(screen.queryByTestId('view-nav-timeline')).toBeVisible()
  })
})
