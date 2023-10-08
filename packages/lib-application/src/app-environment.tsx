import type { QueryResource } from '@gnowth/lib-types'
import type { ReactElement, ReactNode } from 'react'
import { useState, Fragment } from 'react'
import { objectDefaults } from '@gnowth/lib-utils'
import { HashRouter } from 'react-router-dom'

import type { PropsApplication } from './context-application'
import type { PropsEnvironment } from './context-environment'
import { AppBoundary } from './app-boundary'
import { AppProvider } from './app-provider'
import { AppSuspense } from './app-suspense'
import { AppSwitch } from './app-switch'
import { ContextEnvironment, propsDefaultEnvironment } from './context-environment'

interface Props extends Partial<Omit<PropsEnvironment, 'whoami'>>, Omit<PropsApplication, 'application'> {
  children: ReactNode
  switch?: boolean
}

// TODO add warning/error model?
// TODO add settings in environment
// TODO add store? history?
export function AppEnvironment(props: Props): ReactElement {
  const [whoami, whoamiSet] = useState<QueryResource | null>(null)
  const propsWithDefault = objectDefaults(
    { whoami, whoamiSet } as PropsEnvironment,
    props,
    propsDefaultEnvironment,
  )

  const SwitchComponent = props.switch ?? true ? AppSwitch : Fragment

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
