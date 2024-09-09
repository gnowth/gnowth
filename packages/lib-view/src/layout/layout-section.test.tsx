import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { LayoutSection } from './layout-section'

describe('LayoutSection', () => {
  const renderComponent = testMakeRenderComponent({ Component: LayoutSection })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent()
    expect(screen.queryByTestId('view-layout-section')).toBeVisible()
  })
})
