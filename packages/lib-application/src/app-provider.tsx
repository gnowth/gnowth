import type { ReactElement, ReactNode } from 'react'
import { useContext } from 'react'
import { objectDefaults } from '@gnowth/lib-utils'

import type { PropsApplication } from './context-application'
import { ContextApplication } from './context-application'

interface Props extends Partial<PropsApplication> {
  children: ReactNode
}

export function AppProvider(props: Props): ReactElement {
  const context = useContext(ContextApplication)
  const propsWithDefault = objectDefaults(props as PropsApplication, context)

  return <ContextApplication.Provider value={propsWithDefault}>{props.children}</ContextApplication.Provider>
}
