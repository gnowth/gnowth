import { describe, expect, it } from '@jest/globals'
import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { InputCascader } from './input-cascader'

describe('inputCascader', () => {
  const renderComponent = testMakeRenderComponent({ Component: InputCascader })

  it('renders properly', async () => {
    expect.assertions(1)

    await renderComponent()

    expect(screen.queryByTestId('view-input-cascader')).toBeVisible()
  })
})
