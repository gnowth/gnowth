import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { LayoutAppMain } from './layout-app-main'

describe('LayoutAppMain', () => {
  const renderComponent = testMakeRenderComponent({ Component: LayoutAppMain })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent()
    expect(screen.queryByTestId('view-layout-app-main')).toBeVisible()
  })
})
