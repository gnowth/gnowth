import { describe, expect, it } from '@jest/globals'
import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { LayoutGrid } from './layout-grid'

describe('layoutGrid', () => {
  const renderComponent = testMakeRenderComponent({ Component: LayoutGrid })

  it('renders properly', async () => {
    expect.assertions(1)

    await renderComponent()

    expect(screen.queryByTestId('view-layout-grid')).toBeVisible()
  })
})
