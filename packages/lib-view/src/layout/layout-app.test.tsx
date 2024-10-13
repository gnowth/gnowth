import { describe, expect, it } from '@jest/globals'
import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { LayoutApp } from './layout-app'

describe('layoutApp', () => {
  const renderComponent = testMakeRenderComponent({ Component: LayoutApp })

  it('renders properly', async () => {
    expect.assertions(1)

    await renderComponent()

    expect(screen.queryByTestId('view-layout-app')).toBeVisible()
  })
})
