import { AppSuspense, PropsSuspense } from '@gnowth/lib-application'
import { ComponentType, FunctionComponent, ReactNode } from 'react'

import { PropsUseDataConnect, useDataConnect } from './use-data-connect'

interface Props extends PropsUseDataConnect {
  awaiting?: boolean
  children: ReactNode
  hidden?: boolean
  slot?: string
  suspense?: ComponentType<PropsSuspense> | string
  suspenseClassName?: string
}

export const DataSuspense: FunctionComponent<Props> = (props) => {
  const connection = useDataConnect(props)

  if (props.hidden) return null

  return (
    <AppSuspense
      awaiting={!!connection.awaiting}
      suspense={props.suspense}
      suspenseClassName={props.suspenseClassName}
    >
      {props.children}
    </AppSuspense>
  )
}
