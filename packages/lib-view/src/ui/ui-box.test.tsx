import { describe, expect, it } from '@jest/globals'
import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { UIBox } from './ui-box'

describe('uIBox', () => {
  const renderComponent = testMakeRenderComponent({ Component: UIBox })

  it('renders properly', async () => {
    expect.assertions(1)

    await renderComponent()

    expect(screen.queryByTestId('view-ui-box')).toBeVisible()
  })
})
