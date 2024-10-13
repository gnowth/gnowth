import { describe, expect, it } from '@jest/globals'
import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { InputText } from './input-text'

describe('inputText', () => {
  const renderComponent = testMakeRenderComponent({ Component: InputText })

  it('renders properly', async () => {
    expect.assertions(1)

    await renderComponent()

    expect(screen.queryByTestId('view-input-text')).toBeVisible()
  })
})
