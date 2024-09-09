import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { UIError } from './ui-error'

describe('UIError', () => {
  const renderComponent = testMakeRenderComponent({ Component: UIError })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent({ props: { value: new Error('message') } })
    expect(screen.queryByTestId('view-ui-error')).toBeVisible()
  })
})
