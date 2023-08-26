import type { FunctionComponent, ReactElement, ReactNode } from 'react'
import _ from 'lodash'
import React from 'react'

interface Props {
  name: string
  slot?: string
}

interface PropsProvider {
  children: ReactNode
  slots: ReactNode
}

interface PropsSlot {
  children?: ReactNode
  slot: string
}

interface PropsTest {
  children: ReactNode
  slot?: string
  test: string
}

interface Component {
  (props: Props): ReactElement | null
  Provider: FunctionComponent<PropsProvider>
  Slot: FunctionComponent<PropsSlot>
  Test: FunctionComponent<PropsTest>
}

const SlotContext = React.createContext<Record<string, ReactElement>>({})

const UtilSlot: Component = (props) => {
  const context = React.useContext(SlotContext)

  return context[props.name] ?? null
}

// eslint-disable-next-line react/display-name
UtilSlot.Provider = (props) => (
  <SlotContext.Provider
    value={_.keyBy(
      React.Children.toArray(props.slots)
        .filter<ReactElement<PropsSlot>>(React.isValidElement)
        .filter((slot) => slot.props.slot),
      'props.slot',
    )}
  >
    {props.children}
  </SlotContext.Provider>
)

// eslint-disable-next-line react/display-name
UtilSlot.Slot = (props) => <>{props.children}</>

// eslint-disable-next-line react/display-name
UtilSlot.Test = (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const context = React.useContext(SlotContext)

  return context[props.test] ? <>{props.children}</> : null
}

export default UtilSlot
