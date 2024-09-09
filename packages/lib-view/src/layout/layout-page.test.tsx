import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { LayoutPage } from './layout-page'

describe('LayoutPage', () => {
  const renderComponent = testMakeRenderComponent({ Component: LayoutPage })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent()
    expect(screen.queryByTestId('view-layout-page')).toBeVisible()
  })
})
