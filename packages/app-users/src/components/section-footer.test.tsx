import { render, screen } from '@testing-library/react'

import { SectionFooter } from '../components/section-footer'

function renderComponent() {
  return render(<SectionFooter />)
}

describe('section-footer', () => {
  it('renders properly', () => {
    renderComponent()

    const copyright = screen.getByText('Copyright © 2022 Gnowth')
    expect(copyright).toBeInTheDocument()
  })
})
