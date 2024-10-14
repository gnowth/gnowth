import {
  Children,
  FunctionComponent,
  ReactElement,
  ReactNode,
  createContext,
  isValidElement,
  useContext,
} from 'react'
import * as R from 'remeda'

type PropsContent = {
  name: string
  slot?: string
}

type PropsProvider = {
  children: ReactNode
  slots: ReactNode
}

type Props = {
  children?: ReactNode
  slot: string
}

type PropsTest = {
  children: ReactNode
  slot?: string
  test: string
}

type Component = {
  Content: FunctionComponent<PropsContent>
  Provider: FunctionComponent<PropsProvider>
  Test: FunctionComponent<PropsTest>
} & FunctionComponent<Props>

const SlotContext = createContext<Record<string, ReactElement>>({})

const SlotContent: FunctionComponent<PropsContent> = (props) => {
  const context = useContext(SlotContext)

  return context[props.name] ?? null
}

const SlotProvider: FunctionComponent<PropsProvider> = (props) => (
  <SlotContext.Provider
    value={R.indexBy(
      Children.toArray(props.slots)
        .filter<ReactElement<Props>>(isValidElement)
        .filter((slot) => slot.props.slot),
      (child) => child.props.slot,
    )}
  >
    {props.children}
  </SlotContext.Provider>
)

const SlotTest: FunctionComponent<PropsTest> = (props) => {
  const context = useContext(SlotContext)

  return context[props.test] ? props.children : null
}

export const UtilSlot: Component = (props) => props.children

UtilSlot.Content = SlotContent
UtilSlot.Provider = SlotProvider
UtilSlot.Test = SlotTest
