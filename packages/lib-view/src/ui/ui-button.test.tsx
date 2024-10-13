import { describe, expect, it } from '@jest/globals'
import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { UIButton } from './ui-button'

describe('uIButton', () => {
  const renderComponent = testMakeRenderComponent({ Component: UIButton })

  it('renders properly', async () => {
    expect.assertions(1)

    await renderComponent()

    expect(screen.queryByTestId('view-ui-button')).toBeVisible()
  })
})
