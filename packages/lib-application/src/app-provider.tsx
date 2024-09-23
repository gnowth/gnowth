import { FunctionComponent, ReactNode, useContext } from 'react'
import * as R from 'remeda'

import { ContextApplication, PropsApplication } from './context-application'

interface Props extends Partial<PropsApplication> {
  children: ReactNode
}

export const AppProvider: FunctionComponent<Props> = (props) => {
  const context = useContext(ContextApplication)
  const propsWithDefault = R.merge(
    context,
    R.omitBy(props, (value) => value === undefined) as PropsApplication,
  )

  return <ContextApplication.Provider value={propsWithDefault}>{props.children}</ContextApplication.Provider>
}
