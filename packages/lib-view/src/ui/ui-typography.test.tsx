import { describe, expect, it } from '@jest/globals'
import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { UITypography } from './ui-typography'

describe('uITypography', () => {
  const renderComponent = testMakeRenderComponent({ Component: UITypography })

  it('renders properly', async () => {
    expect.assertions(1)

    await renderComponent()

    expect(screen.queryByTestId('view-ui-typography')).toBeVisible()
  })
})
