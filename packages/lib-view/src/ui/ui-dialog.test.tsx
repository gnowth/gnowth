import { describe, expect, it } from '@jest/globals'
import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { UIDialog } from './ui-dialog'

describe('uIDialog', () => {
  const renderComponent = testMakeRenderComponent({ Component: UIDialog })

  it('renders properly', async () => {
    expect.assertions(1)

    await renderComponent()

    expect(screen.queryByTestId('view-ui-dialog')).toBeVisible()
  })
})
