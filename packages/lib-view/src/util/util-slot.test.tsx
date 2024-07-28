import type { FunctionComponent, ReactNode } from 'react'

import { render, screen } from '@testing-library/react'

import { UtilSlot } from './util-slot'

type Props = {
  children: ReactNode
}

const DummyComponent: FunctionComponent<Props> = (props) => (
  <UtilSlot.Provider slots={props.children}>
    <UtilSlot.Test test="header">
      <header>
        <UtilSlot.Content name="header" />
      </header>
    </UtilSlot.Test>

    <UtilSlot.Test test="main">
      <main title="main">
        <UtilSlot.Content name="main" />
      </main>
    </UtilSlot.Test>

    <UtilSlot.Test test="footer">
      <footer title="footer">
        <UtilSlot.Content name="footer" />
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
        <UtilSlot slot="header">
          <p>Header</p>
        </UtilSlot>
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
