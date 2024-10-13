import { describe, expect, it } from '@jest/globals'
import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { UISkeleton } from './ui-skeleton'

describe('uISkeleton', () => {
  const renderComponent = testMakeRenderComponent({ Component: UISkeleton })

  it('renders properly', async () => {
    expect.assertions(1)

    await renderComponent()

    expect(screen.queryByTestId('view-ui-skeleton')).toBeVisible()
  })
})
