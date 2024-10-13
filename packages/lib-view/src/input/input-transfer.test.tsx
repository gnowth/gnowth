import { describe, expect, it } from '@jest/globals'
import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { InputTransfer } from './input-transfer'

describe('inputTransfer', () => {
  const renderComponent = testMakeRenderComponent({ Component: InputTransfer })

  it('renders properly', async () => {
    expect.assertions(1)

    await renderComponent()

    expect(screen.queryByTestId('view-input-transfer')).toBeVisible()
  })
})
