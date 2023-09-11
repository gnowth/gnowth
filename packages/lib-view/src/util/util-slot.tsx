import type { FunctionComponent, ReactElement, ReactNode } from 'react'
import _ from 'lodash'
import { createContext, isValidElement, useContext, Children } from 'react'

interface PropsContent {
  name: string
  slot?: string
}

interface PropsProvider {
  children: ReactNode
  slots: ReactNode
}

interface Props {
  children?: ReactNode
  slot: string
}

interface PropsTest {
  children: ReactNode
  slot?: string
  test: string
}

interface Component extends FunctionComponent<Props> {
  Content: FunctionComponent<PropsContent>
  Provider: FunctionComponent<PropsProvider>
  Test: FunctionComponent<PropsTest>
}

const SlotContext = createContext<Record<string, ReactElement>>({})

const SlotContent: FunctionComponent<PropsContent> = (props) => {
  const context = useContext(SlotContext)

  return context[props.name] ?? null
}

const SlotProvider: FunctionComponent<PropsProvider> = (props) => (
  <SlotContext.Provider
    value={_.keyBy(
      Children.toArray(props.slots)
        .filter<ReactElement<Props>>(isValidElement)
        .filter((slot) => slot.props.slot),
      'props.slot',
    )}
  >
    {props.children}
  </SlotContext.Provider>
)

const SlotTest: FunctionComponent<PropsTest> = (props) => {
  const context = useContext(SlotContext)

  return context[props.test] ? <>{props.children}</> : null
}

export const UtilSlot: Component = (props) => <>{props.children}</>

UtilSlot.Content = SlotContent
UtilSlot.Provider = SlotProvider
UtilSlot.Test = SlotTest
