import { describe, expect, it } from '@jest/globals'
import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { UIProgress } from './ui-progress'

describe('uIProgress', () => {
  const renderComponent = testMakeRenderComponent({ Component: UIProgress })

  it('renders properly', async () => {
    expect.assertions(1)

    await renderComponent()

    expect(screen.queryByTestId('view-ui-progress')).toBeVisible()
  })
})
