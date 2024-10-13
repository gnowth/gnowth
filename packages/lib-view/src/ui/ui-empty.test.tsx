import { describe, expect, it } from '@jest/globals'
import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { UIEmpty } from './ui-empty'

describe('uIEmpty', () => {
  const renderComponent = testMakeRenderComponent({ Component: UIEmpty })

  it('renders properly', async () => {
    expect.assertions(1)

    await renderComponent()

    expect(screen.queryByTestId('view-ui-empty')).toBeVisible()
  })
})
