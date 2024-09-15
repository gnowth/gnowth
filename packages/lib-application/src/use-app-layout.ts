import { ComponentType, useContext } from 'react'

import { ContextEnvironment } from './context-environment'
import { TokenComponentNamespace } from './token-component-namespace'
import { PropsLayout } from './types'
import { useAppTheme } from './use-app-theme'

type ComponentLayout = ComponentType<PropsLayout>

export function useAppLayout(layout?: ComponentLayout | string): ComponentLayout | undefined {
  const contextEnvironment = useContext(ContextEnvironment)
  const theme = useAppTheme()

  return theme.getComponent({
    component: layout,
    componentNamespace: TokenComponentNamespace.layout,
    components: contextEnvironment.layouts,
  })
}
