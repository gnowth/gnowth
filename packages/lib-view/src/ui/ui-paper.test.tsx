import { describe, expect, it } from '@jest/globals'
import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { UIPaper } from './ui-paper'

describe('uIPaper', () => {
  const renderComponent = testMakeRenderComponent({ Component: UIPaper })

  it('renders properly', async () => {
    expect.assertions(1)

    await renderComponent()

    expect(screen.queryByTestId('view-ui-paper')).toBeVisible()
  })
})
