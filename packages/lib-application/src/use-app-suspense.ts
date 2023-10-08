import type { ComponentType } from 'react'
import { TokenNamespaceComponent } from '@gnowth/lib-token'
import { useContext } from 'react'

import type { PropsSuspense } from './types'
import { ContextApplication } from './context-application'
import { ContextEnvironment } from './context-environment'
import { useAppTheme } from './use-app-theme'

type Suspense = ComponentType<PropsSuspense> | null

export function useAppSuspense(suspense?: Suspense | string): Suspense | undefined {
  const contextApplication = useContext(ContextApplication)
  const contextEnvironment = useContext(ContextEnvironment)
  const theme = useAppTheme()
  const suspenseOrName = suspense || contextApplication.suspense

  if (suspenseOrName === null) return null

  if (!suspenseOrName) {
    return theme.getComponent({
      component: 'suspense',
      namespace: 'type',
    })
  }

  return theme.getComponent({
    component: suspenseOrName,
    components: contextEnvironment.suspenses,
    namespace: TokenNamespaceComponent.suspense,
  })
}
