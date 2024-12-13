import {
  Children,
  createContext,
  FunctionComponent,
  isValidElement,
  ReactElement,
  ReactNode,
  useContext,
} from 'react'
import * as R from 'remeda'

type Component = FunctionComponent<Props> & {
  Content: FunctionComponent<PropsContent>
  Provider: FunctionComponent<PropsProvider>
  Test: FunctionComponent<PropsTest>
}

type Props = {
  children?: ReactNode
  slot: string
}

type PropsContent = {
  name: string
  slot?: string
}

type PropsProvider = {
  children: ReactNode
  slots: ReactNode
}

type PropsTest = {
  children: ReactNode
  slot?: string
  test: string
}

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
