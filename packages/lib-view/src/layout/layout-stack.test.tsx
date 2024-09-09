import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { LayoutStack } from './layout-stack'

describe('LayoutStack', () => {
  const renderComponent = testMakeRenderComponent({ Component: LayoutStack })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent()
    expect(screen.queryByTestId('view-layout-stack')).toBeVisible()
  })
})
