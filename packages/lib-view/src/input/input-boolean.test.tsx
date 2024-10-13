import { describe, expect, it } from '@jest/globals'
import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { InputBoolean } from './input-boolean'

describe('inputBoolean', () => {
  const renderComponent = testMakeRenderComponent({ Component: InputBoolean })

  it('renders properly', async () => {
    expect.assertions(1)

    await renderComponent()

    expect(screen.queryByTestId('view-input-boolean')).toBeVisible()
  })
})
