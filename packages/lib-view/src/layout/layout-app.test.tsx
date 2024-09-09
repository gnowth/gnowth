import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { LayoutApp } from './layout-app'

describe('LayoutApp', () => {
  const renderComponent = testMakeRenderComponent({ Component: LayoutApp })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent()
    expect(screen.queryByTestId('view-layout-app')).toBeVisible()
  })
})
