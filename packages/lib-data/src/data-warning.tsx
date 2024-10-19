import { PropsBoundary } from '@gnowth/lib-application'
import { ComponentType, FunctionComponent } from 'react'

import { DataName } from './types'

type PropsWarning = {
  name?: DataName
  slot?: string
  warning?: ComponentType<PropsBoundary> | null | string
}

// TODO: handle case where default boundary is not set. or get from datasource maybe?
// TODO: handle async properly
// TODO: standardise errors so that error does not need to be mapped to message
export const DataWarning: FunctionComponent<PropsWarning> = (props) => {
  if (!props) return <div />
  return null
}
