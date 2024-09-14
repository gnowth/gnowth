import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { SectionFooter } from './section-footer'

describe('section-footer', () => {
  const renderComponent = testMakeRenderComponent({ Component: SectionFooter })

  it('renders properly', async () => {
    await renderComponent()
    const copyright = screen.getByText('Copyright © 2022 Gnowth')
    expect(copyright).toBeVisible()
  })
})
