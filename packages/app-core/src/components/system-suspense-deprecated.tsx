import type { ComponentType, FunctionComponent, ReactNode } from 'react'
import { Suspense } from 'react'

type Props = {
  FallbackComponent?: ComponentType | null
  children: ReactNode
}

export const SystemSuspenseDeprecated: FunctionComponent<Props> = (props) => {
  if (!props.FallbackComponent) {
    return <>{props.children}</>
  }

  return <Suspense fallback={<props.FallbackComponent />}>{props.children}</Suspense>
}
