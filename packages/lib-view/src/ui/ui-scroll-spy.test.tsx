import { describe, expect, it } from '@jest/globals'
import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { UIScrollSpy } from './ui-scroll-spy'

describe('uIScrollSpy', () => {
  const renderComponent = testMakeRenderComponent({ Component: UIScrollSpy })

  it('renders properly', async () => {
    expect.assertions(1)

    await renderComponent()

    expect(screen.queryByTestId('view-ui-scroll-spy')).toBeVisible()
  })
})
