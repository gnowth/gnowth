import { describe, expect, it } from '@jest/globals'
import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { UICarousel } from './ui-carousel'

describe('uICarousel', () => {
  const renderComponent = testMakeRenderComponent({ Component: UICarousel })

  it('renders properly', async () => {
    expect.assertions(1)

    await renderComponent()

    expect(screen.queryByTestId('view-ui-carousel')).toBeVisible()
  })
})
