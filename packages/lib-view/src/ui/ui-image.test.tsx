import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { UIImage } from './ui-image'

describe('UIImage', () => {
  const renderComponent = testMakeRenderComponent({ Component: UIImage })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent()
    expect(screen.queryByTestId('view-ui-image')).toBeVisible()
  })
})
