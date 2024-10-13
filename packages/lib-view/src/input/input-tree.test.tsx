import { describe, expect, it } from '@jest/globals'
import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { InputTree } from './input-tree'

describe('inputTree', () => {
  const renderComponent = testMakeRenderComponent({ Component: InputTree })

  it('renders properly', async () => {
    expect.assertions(1)

    await renderComponent()

    expect(screen.queryByTestId('view-input-tree')).toBeVisible()
  })
})
