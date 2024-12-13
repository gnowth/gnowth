import { ComponentType, FunctionComponent, ReactNode, Suspense } from 'react'

type Props = {
  children: ReactNode
  FallbackComponent?: ComponentType | null
}

export const SystemSuspense: FunctionComponent<Props> = (props) => {
  if (!props.FallbackComponent) {
    return props.children
  }

  return <Suspense fallback={<props.FallbackComponent />}>{props.children}</Suspense>
}
