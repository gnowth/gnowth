import { describe, expect, it } from '@jest/globals'
import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { LayoutData } from './layout-data'

describe('layoutData', () => {
  const renderComponent = testMakeRenderComponent({ Component: LayoutData })

  it('renders properly', async () => {
    expect.assertions(1)

    await renderComponent()

    expect(screen.queryByTestId('view-layout-data')).toBeVisible()
  })
})
