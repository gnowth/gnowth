import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { LayoutContent } from './layout-content'

describe('LayoutContent', () => {
  const renderComponent = testMakeRenderComponent({ Component: LayoutContent })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent()
    expect(screen.queryByTestId('view-layout-content')).toBeVisible()
  })
})
