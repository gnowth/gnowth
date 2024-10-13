import { describe, expect, it } from '@jest/globals'
import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { UITooltip } from './ui-tooltip'

describe('uITooltip', () => {
  const renderComponent = testMakeRenderComponent({ Component: UITooltip })

  it('renders properly', async () => {
    expect.assertions(1)

    await renderComponent()

    expect(screen.queryByTestId('view-ui-tooltip')).toBeVisible()
  })
})
