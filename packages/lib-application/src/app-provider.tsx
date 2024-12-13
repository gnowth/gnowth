import { objectDefaults } from '@gnowth/lib-utils'
import { FunctionComponent, ReactNode, useContext } from 'react'

import { ContextApplication, PropsApplication } from './context-application'

type Props = Partial<PropsApplication> & {
  children: ReactNode
}

export const AppProvider: FunctionComponent<Props> = (props) => {
  const context = useContext(ContextApplication)
  const propsWithDefault = objectDefaults(props as PropsApplication, context)

  return <ContextApplication.Provider value={propsWithDefault}>{props.children}</ContextApplication.Provider>
}
