import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { UITypography } from './ui-typography'

describe('UITypography', () => {
  const renderComponent = testMakeRenderComponent({ Component: UITypography })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent()
    expect(screen.queryByTestId('view-ui-typography')).toBeVisible()
  })
})
