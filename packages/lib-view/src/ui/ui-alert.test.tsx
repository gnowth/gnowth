import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { UIAlert } from './ui-alert'

describe('UIAlert', () => {
  const renderComponent = testMakeRenderComponent({ Component: UIAlert })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent()
    expect(screen.queryByTestId('view-ui-alert')).toBeVisible()
  })
})
