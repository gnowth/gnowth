import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { UIAccordion } from './ui-accordion'

describe('UIAccordion', () => {
  const renderComponent = testMakeRenderComponent({ Component: UIAccordion })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent()
    expect(screen.queryByTestId('view-ui-accordion')).toBeVisible()
  })
})
