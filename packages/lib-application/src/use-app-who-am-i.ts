import { useContext } from 'react'

import { ContextEnvironment } from './context-environment'
import { QueryResource } from './queries/query-resource'

export function useAppWhoAmI(): [null | QueryResource, (resource: null | QueryResource) => void] {
  const contextEnvironment = useContext(ContextEnvironment)

  return [contextEnvironment.whoami, contextEnvironment.whoamiSet]
}
