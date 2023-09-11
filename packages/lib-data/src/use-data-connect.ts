import type { DataName, PropsData } from '@gnowth/lib-types'
import React from 'react'

import { DataContext } from './data-context'

export interface PropsUseDataConnect {
  awaiting?: boolean
  name?: DataName
}

// TODO compute awaiting from props and context?
// TODO should we allow override?
export function useDataConnect<Value>(props: PropsUseDataConnect): PropsData<Value> {
  const context = React.useContext(DataContext)

  return context.connect<Value>(props.name) || {}
}
