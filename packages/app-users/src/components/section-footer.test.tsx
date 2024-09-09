import { screen } from '@testing-library/react'

import { SectionFooter } from '../components/section-footer'
import { testMakeRenderComponent } from '../modules/tests'

describe('section-footer', () => {
  const renderComponent = testMakeRenderComponent({ Component: SectionFooter })

  it('renders properly', async () => {
    await renderComponent()
    const copyright = screen.getByText('Copyright © 2022 Gnowth')
    expect(copyright).toBeInTheDocument()
  })
})
