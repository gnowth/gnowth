import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { UISkeleton } from './ui-skeleton'

describe('UISkeleton', () => {
  const renderComponent = testMakeRenderComponent({ Component: UISkeleton })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent()
    expect(screen.queryByTestId('view-ui-skeleton')).toBeVisible()
  })
})
