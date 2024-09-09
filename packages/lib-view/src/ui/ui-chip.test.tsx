import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { UIChip } from './ui-chip'

describe('UIChip', () => {
  const renderComponent = testMakeRenderComponent({ Component: UIChip })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent()
    expect(screen.queryByTestId('view-ui-chip')).toBeVisible()
  })
})
