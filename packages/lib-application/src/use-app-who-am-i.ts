import { useContext } from 'react'

import { ContextEnvironment } from './context-environment'
import { QueryResource } from './queries/query-resource'

export function useAppWhoAmI(): [QueryResource | null, (resource: QueryResource | null) => void] {
  const contextEnvironment = useContext(ContextEnvironment)

  return [contextEnvironment.whoami, contextEnvironment.whoamiSet]
}
