import { FunctionComponent, PropsWithChildren } from 'react'

// DEBT(implementation): implement feature
type Props = PropsWithChildren
export const PlatformProviderI18n: FunctionComponent<Props> = (props) => {
  return <>{props.children}</>
}
