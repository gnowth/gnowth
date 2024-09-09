import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { UICard } from './ui-card'

describe('UICard', () => {
  const renderComponent = testMakeRenderComponent({ Component: UICard })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent()
    expect(screen.queryByTestId('view-ui-card')).toBeVisible()
  })
})
