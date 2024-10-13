import { describe, expect, it } from '@jest/globals'
import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { UIAvatar } from './ui-avatar'

describe('uIAvatar', () => {
  const renderComponent = testMakeRenderComponent({ Component: UIAvatar })

  it('renders properly', async () => {
    expect.assertions(1)

    await renderComponent()

    expect(screen.queryByTestId('view-ui-avatar')).toBeVisible()
  })
})
