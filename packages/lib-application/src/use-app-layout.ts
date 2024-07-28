import type { ComponentType } from 'react'

import { useContext } from 'react'

import type { PropsLayout } from './types'

import { ContextEnvironment } from './context-environment'
import { TokenComponentNamespace } from './token-component-namespace'
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
