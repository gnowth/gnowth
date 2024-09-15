import { ComponentType, ReactElement, ReactNode, Suspense } from 'react'

import { PropsSuspense } from './types'
import { useAppSuspense } from './use-app-suspense'

// TODO check if we want to force suspense with awaiting props
interface Props {
  awaiting?: boolean
  children: ReactNode
  suspense?: ComponentType<PropsSuspense> | null | string
  suspenseClassName?: string
}

export function AppSuspense(props: Props): ReactElement {
  const SuspenseMaybe = useAppSuspense(props.suspense)

  // TODO: must have a fallback if undefined and log error
  if (!SuspenseMaybe) {
    return <>{props.children}</>
  }

  const suspense = <SuspenseMaybe className={props.suspenseClassName} />

  if (props.awaiting) {
    return suspense
  }

  return <Suspense fallback={suspense}>{props.children}</Suspense>
}
