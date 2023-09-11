import type { Attributes, FunctionComponent, PropsWithChildren } from 'react'

type Props = PropsWithChildren & Attributes

// TODO: implement wrapper with boundary and suspense
export const SystemAugmented: FunctionComponent<Props> = (props) => {
  return props.children
}
