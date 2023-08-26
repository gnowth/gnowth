import type { ReactNode } from 'react'
import React from 'react'
import { render, screen } from '@testing-library/react'

import UtilSlot from './util-slot'

type Props = {
  children: ReactNode
}

const DummyComponent: React.FunctionComponent<Props> = (props) => (
  <UtilSlot.Provider slots={props.children}>
    <UtilSlot.Test test="header">
      <header>
        <UtilSlot name="header" />
      </header>
    </UtilSlot.Test>

    <UtilSlot.Test test="main">
      <main title="main">
        <UtilSlot name="main" />
      </main>
    </UtilSlot.Test>

    <UtilSlot.Test test="footer">
      <footer title="footer">
        <UtilSlot name="footer" />
      </footer>
    </UtilSlot.Test>
  </UtilSlot.Provider>
)

describe('<UtilSlot />', () => {
  it('renders propery', () => {
    render(
      <DummyComponent>
        <p>Footer</p>
        <p slot="main">Main</p>
        Random Stuff
        <UtilSlot.Slot slot="header">
          <p>Header</p>
        </UtilSlot.Slot>
      </DummyComponent>,
    )

    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Main')).toBeInTheDocument()
    expect(screen.queryByText('Footer')).not.toBeInTheDocument()
    expect(screen.queryByText('Random Stuff')).not.toBeInTheDocument()
    expect(screen.getByTitle('main')).toBeInTheDocument()
    expect(screen.queryByTitle('footer')).not.toBeInTheDocument()
  })
})
