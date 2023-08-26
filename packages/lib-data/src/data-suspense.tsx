import type { ReactNode } from 'react'
import type { PropsSuspense } from '@gnowth/lib-types'
import React from 'react'
import { AppSuspense } from '@gnowth/lib-application'

import type { PropsUseDataConnect } from './use-data-connect'
import useDataConnect from './use-data-connect'

interface Props extends PropsUseDataConnect {
  awaiting?: boolean
  children: ReactNode
  hidden?: boolean
  slot?: string
  suspense?: React.ComponentType<PropsSuspense> | string
  suspenseClassName?: string
}

const DataConnect: React.FunctionComponent<Props> = (props) => {
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

export default DataConnect
