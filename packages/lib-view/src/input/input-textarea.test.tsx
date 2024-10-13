import { describe, expect, it } from '@jest/globals'
import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { InputTextarea } from './input-textarea'

describe('inputTextarea', () => {
  const renderComponent = testMakeRenderComponent({ Component: InputTextarea })

  it('renders properly', async () => {
    expect.assertions(1)

    await renderComponent()

    expect(screen.queryByTestId('view-input-textarea')).toBeVisible()
  })
})
