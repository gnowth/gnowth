import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { LayoutData } from './layout-data'

describe('LayoutData', () => {
  const renderComponent = testMakeRenderComponent({ Component: LayoutData })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent()
    expect(screen.queryByTestId('view-layout-data')).toBeVisible()
  })
})
