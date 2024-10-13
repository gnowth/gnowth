import { describe, expect, it } from '@jest/globals'
import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { UIBadge } from './ui-badge'

describe('uIBadge', () => {
  const renderComponent = testMakeRenderComponent({ Component: UIBadge })

  it('renders properly', async () => {
    expect.assertions(1)

    await renderComponent()

    expect(screen.queryByTestId('view-ui-badge')).toBeVisible()
  })
})
