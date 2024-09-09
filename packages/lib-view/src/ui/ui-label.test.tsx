import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { UILabel } from './ui-label'

describe('UILabel', () => {
  const renderComponent = testMakeRenderComponent({ Component: UILabel })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent()
    expect(screen.queryByTestId('view-ui-label')).toBeVisible()
  })
})
