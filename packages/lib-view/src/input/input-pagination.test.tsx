import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { InputPagination } from './input-pagination'

describe('InputPagination', () => {
  const renderComponent = testMakeRenderComponent({ Component: InputPagination })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent()
    expect(screen.queryByTestId('view-input-pagination')).toBeVisible()
  })
})
