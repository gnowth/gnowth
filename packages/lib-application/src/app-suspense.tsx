import type { ComponentType, ReactElement, ReactNode } from 'react'
import { Suspense } from 'react'

import type { PropsSuspense } from './types'
import { useAppSuspense } from './use-app-suspense'

// TODO check if we want to force suspense with awaiting props
interface Props {
  awaiting?: boolean
  children: ReactNode
  suspense?: ComponentType<PropsSuspense> | string | null
  suspenseClassName?: string
}

export function AppSuspense(props: Props): ReactElement {
  const SuspenseMaybe = useAppSuspense(props.suspense)

  if (!SuspenseMaybe) return <>{props.children}</>

  const suspense = <SuspenseMaybe className={props.suspenseClassName} />

  if (props.awaiting) return suspense

  return <Suspense fallback={suspense}>{props.children}</Suspense>
}
