import type { PropsFrame } from '@gnowth/lib-types'
import type { Theme } from '@gnowth/lib-theme'
import type { ComponentType, ReactElement, ReactNode } from 'react'
import { Fragment } from 'react'
import { Route } from 'react-router-dom'

import { AppBoundary } from './app-boundary'
import { AppModelApplication } from './app-model-application'
import { AppProvider } from './app-provider'
import { AppSuspense } from './app-suspense'
import { AppSwitch } from './app-switch'
import { useAppApplication } from './use-app-application'

interface Props {
  application?: AppModelApplication | string
  children: ReactNode
  frame?: ComponentType<PropsFrame> | string | null
  path?: string
  switch?: boolean
  theme?: Theme | string
}

// TODO: check if path is provided, should it somehow override AppPage root?
export function AppApplication(props: Props): ReactElement {
  const application = useAppApplication(props.application)
  const SwitchComponent = props.switch ?? true ? AppSwitch : Fragment

  return (
    <Route path={props.path ?? application.route}>
      <AppProvider application={application} frame={props.frame} theme={props.theme}>
        <AppBoundary>
          <AppSuspense>
            <SwitchComponent>{props.children}</SwitchComponent>
          </AppSuspense>
        </AppBoundary>
      </AppProvider>
    </Route>
  )
}
