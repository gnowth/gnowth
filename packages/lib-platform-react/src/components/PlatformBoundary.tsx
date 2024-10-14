import { FunctionComponent, PropsWithChildren } from 'react'

// DEBT(feature): add error boundary
// DEBT(feature): add suspense boundary
type Props = PropsWithChildren
export const PlatformBoundary: FunctionComponent<Props> = (props) => {
  return props.children
}
