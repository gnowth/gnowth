import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { InputCascader } from './input-cascader'

describe('InputCascader', () => {
  const renderComponent = testMakeRenderComponent({ Component: InputCascader })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent()
    expect(screen.queryByTestId('view-input-cascader')).toBeVisible()
  })
})
