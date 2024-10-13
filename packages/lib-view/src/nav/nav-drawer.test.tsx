import { describe, expect, it } from '@jest/globals'
import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { NavDrawer } from './nav-drawer'

describe('navDrawer', () => {
  const renderComponent = testMakeRenderComponent({ Component: NavDrawer })

  it('renders properly', async () => {
    expect.assertions(1)

    await renderComponent()

    expect(screen.queryByTestId('view-nav-drawer')).toBeVisible()
  })
})
