import { ComponentType, FunctionComponent, ReactNode, Suspense } from 'react'

type Props = {
  FallbackComponent?: ComponentType | null
  children: ReactNode
}

export const SystemSuspense: FunctionComponent<Props> = (props) => {
  if (!props.FallbackComponent) {
    return props.children
  }

  return <Suspense fallback={<props.FallbackComponent />}>{props.children}</Suspense>
}
