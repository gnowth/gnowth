import { useContext } from 'react'

import { AppModelEnvironment } from './app-model-environment'
import { ContextEnvironment } from './context-environment'

export function useAppEnvironment(): AppModelEnvironment {
  const contextEnvironment = useContext(ContextEnvironment)

  return contextEnvironment.environment
}
