import { describe, expect, it } from '@jest/globals'
import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { InputMention } from './input-mention'

describe('inputMention', () => {
  const renderComponent = testMakeRenderComponent({ Component: InputMention })

  it('renders properly', async () => {
    expect.assertions(1)

    await renderComponent()

    expect(screen.queryByTestId('view-input-mention')).toBeVisible()
  })
})
