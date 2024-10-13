import { describe, expect, it } from '@jest/globals'
import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { InputDate } from './input-date'

describe('inputDate', () => {
  const renderComponent = testMakeRenderComponent({ Component: InputDate })

  it('renders properly', async () => {
    expect.assertions(1)

    await renderComponent()

    expect(screen.queryByTestId('view-input-date')).toBeVisible()
  })
})
