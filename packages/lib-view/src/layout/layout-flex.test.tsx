import { describe, expect, it } from '@jest/globals'
import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { LayoutFlex } from './layout-flex'

describe('layoutFlex', () => {
  const renderComponent = testMakeRenderComponent({ Component: LayoutFlex })

  it('renders properly', async () => {
    expect.assertions(1)

    await renderComponent()

    expect(screen.queryByTestId('view-layout-flex')).toBeVisible()
  })
})
