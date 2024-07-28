import type { QueryResource } from '@gnowth/lib-query'

import { useContext } from 'react'

import { ContextEnvironment } from './context-environment'

export function useAppWhoAmI(): [QueryResource | null, (resource: QueryResource | null) => void] {
  const contextEnvironment = useContext(ContextEnvironment)

  return [contextEnvironment.whoami, contextEnvironment.whoamiSet]
}
