import type { PropsLayout } from '@gnowth/lib-types'
import type { ComponentType } from 'react'
import { TokenNamespaceComponent } from '@gnowth/lib-token'
import { useContext } from 'react'

import ContextEnvironment from './context-environment'
import useAppTheme from './use-app-theme'

type ComponentLayout = ComponentType<PropsLayout>

function useAppLayout(layout?: ComponentLayout | string): ComponentLayout | undefined {
  const contextEnvironment = useContext(ContextEnvironment)
  const theme = useAppTheme()

  return theme.getComponent({
    component: layout,
    components: contextEnvironment.layouts,
    namespace: TokenNamespaceComponent.layout,
  })
}

export default useAppLayout
