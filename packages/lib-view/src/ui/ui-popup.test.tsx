import { describe, expect, it } from '@jest/globals'
import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { UIPopup } from './ui-popup'

describe('uIPopup', () => {
  const renderComponent = testMakeRenderComponent({ Component: UIPopup })

  it('renders properly', async () => {
    expect.assertions(1)

    await renderComponent()

    expect(screen.queryByTestId('view-ui-popup')).toBeVisible()
  })
})
