import { objectDefaults } from '@gnowth/lib-utils'
import { Fragment, FunctionComponent, ReactNode, useState } from 'react'
import { HashRouter } from 'react-router-dom'

import { AppBoundary } from './app-boundary'
import { AppProvider } from './app-provider'
import { AppSuspense } from './app-suspense'
import { AppSwitch } from './app-switch'
import { PropsApplication } from './context-application'
import { ContextEnvironment, PropsEnvironment, propsDefaultEnvironment } from './context-environment'
import { QueryResource } from './queries/query-resource'

type Props = {
  children: ReactNode
  switch?: boolean
} & Omit<PropsApplication, 'application'> &
  Partial<Omit<PropsEnvironment, 'whoami'>>

// TODO add warning/error model?
// TODO add settings in environment
// TODO add store? history?
export const AppEnvironment: FunctionComponent<Props> = (props) => {
  const [whoami, setWhoami] = useState<QueryResource | null>(null)
  const propsWithDefault = objectDefaults(
    { whoami, whoamiSet: setWhoami } as PropsEnvironment,
    props,
    propsDefaultEnvironment,
  )

  const SwitchComponent = (props.switch ?? true) ? AppSwitch : Fragment

  return (
    <HashRouter>
      <ContextEnvironment.Provider value={propsWithDefault}>
        <AppProvider frame={props.frame} suspense={props.suspense} theme={props.theme}>
          <AppBoundary>
            <AppSuspense>
              <SwitchComponent>{props.children}</SwitchComponent>
            </AppSuspense>
          </AppBoundary>
        </AppProvider>
      </ContextEnvironment.Provider>
    </HashRouter>
  )
}
