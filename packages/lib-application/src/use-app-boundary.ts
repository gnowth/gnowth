import { ComponentType, useContext } from 'react'

import { ContextApplication } from './context-application'
import { ContextEnvironment } from './context-environment'
import { TokenComponentNamespace } from './token-component-namespace'
import { PropsBoundary } from './types'
import { useAppTheme } from './use-app-theme'

type Boundary = ComponentType<PropsBoundary> | null

export function useAppBoundary(boundary?: Boundary | string): Boundary | undefined {
  const contextApplication = useContext(ContextApplication)
  const contextEnvironment = useContext(ContextEnvironment)
  const theme = useAppTheme()
  const boundaryOrName = boundary || contextApplication.boundary

  if (boundaryOrName === null) return null

  if (!boundaryOrName) {
    return theme.getComponent({ component: 'boundary' })
  }

  return theme.getComponent({
    component: boundaryOrName,
    componentNamespace: TokenComponentNamespace.boundary,
    components: contextEnvironment.boundaries,
  })
}
