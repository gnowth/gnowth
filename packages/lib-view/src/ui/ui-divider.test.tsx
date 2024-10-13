import { describe, expect, it } from '@jest/globals'
import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { UIDivider } from './ui-divider'

describe('uIDivider', () => {
  const renderComponent = testMakeRenderComponent({ Component: UIDivider })

  it('renders properly', async () => {
    expect.assertions(1)

    await renderComponent()

    expect(screen.queryByTestId('view-ui-divider')).toBeVisible()
  })
})
