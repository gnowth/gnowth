import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { UIPlaceholder } from './ui-placeholder'

describe('UIPlaceholder', () => {
  const renderComponent = testMakeRenderComponent({ Component: UIPlaceholder })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent()
    expect(screen.queryByTestId('view-ui-placeholder')).toBeVisible()
  })
})
