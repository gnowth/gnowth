import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { UISnackbar } from './ui-snackbar'

describe('UISnackbar', () => {
  const renderComponent = testMakeRenderComponent({ Component: UISnackbar })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent()
    expect(screen.queryByTestId('view-ui-snackbar')).toBeVisible()
  })
})
