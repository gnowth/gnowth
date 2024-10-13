import { describe, expect, it } from '@jest/globals'
import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { NavTabs } from './nav-tabs'

describe('navTabs', () => {
  const renderComponent = testMakeRenderComponent({ Component: NavTabs })

  it('renders properly', async () => {
    expect.assertions(1)

    await renderComponent()

    expect(screen.queryByTestId('view-nav-tabs')).toBeVisible()
  })
})
