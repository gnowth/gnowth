import type { ReactElement, ReactNode } from 'react'
import React from 'react'
import { utils } from '@gnowth/lib-util'

import type { PropsApplication } from './context-application'
import ContextApplication from './context-application'

interface Props extends Partial<PropsApplication> {
  children: ReactNode
}

function AppProvider(props: Props): ReactElement {
  const context = React.useContext(ContextApplication)
  const propsWithDefault = utils.defaults(props, context)

  return <ContextApplication.Provider value={propsWithDefault}>{props.children}</ContextApplication.Provider>
}

export default AppProvider
