import { ComponentType, useContext } from 'react'

import { ContextApplication } from './context-application'
import { ContextEnvironment } from './context-environment'
import { TokenComponentNamespace } from './token-component-namespace'
import { PropsSuspense } from './types'
import { useAppTheme } from './use-app-theme'

type Suspense = ComponentType<PropsSuspense> | null

export function useAppSuspense(suspense?: Suspense | string): Suspense | undefined {
  const contextApplication = useContext(ContextApplication)
  const contextEnvironment = useContext(ContextEnvironment)
  const theme = useAppTheme()
  const suspenseOrName = suspense || contextApplication.suspense

  if (suspenseOrName === null) return null

  if (!suspenseOrName) {
    return theme.getComponent({ component: 'suspense' })
  }

  return theme.getComponent({
    component: suspenseOrName,
    componentNamespace: TokenComponentNamespace.suspense,
    components: contextEnvironment.suspenses,
  })
}
