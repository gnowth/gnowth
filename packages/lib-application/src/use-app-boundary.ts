import type { ComponentType } from 'react'
import { TokenNamespaceComponent } from '@gnowth/lib-token'
import { useContext } from 'react'

import type { PropsBoundary } from './types'
import { ContextApplication } from './context-application'
import { ContextEnvironment } from './context-environment'
import { useAppTheme } from './use-app-theme'

type Boundary = ComponentType<PropsBoundary> | null

export function useAppBoundary(boundary?: Boundary | string): Boundary | undefined {
  const contextApplication = useContext(ContextApplication)
  const contextEnvironment = useContext(ContextEnvironment)
  const theme = useAppTheme()
  const boundaryOrName = boundary || contextApplication.boundary

  if (boundaryOrName === null) return null

  if (!boundaryOrName) {
    return theme.getComponent({
      component: 'boundary',
      namespace: 'type',
    })
  }

  return theme.getComponent({
    component: boundaryOrName,
    components: contextEnvironment.boundaries,
    namespace: TokenNamespaceComponent.boundary,
  })
}
