import type { QueryResource } from '@gnowth/lib-types'
import { useContext } from 'react'

import ContextEnvironment from './context-environment'

function useAppWhoAmI(): [QueryResource | null, (resource: QueryResource | null) => void] {
  const contextEnvironment = useContext(ContextEnvironment)

  return [contextEnvironment.whoami, contextEnvironment.whoamiSet]
}

export default useAppWhoAmI