import { Theme } from '@gnowth/lib-theme'
import { ComponentType, Fragment, FunctionComponent, ReactNode } from 'react'

import { AppBoundary } from './app-boundary'
import { AppModelApplication } from './app-model-application'
import { AppProvider } from './app-provider'
import { AppSuspense } from './app-suspense'
import { AppSwitch } from './app-switch'
import { PropsFrame } from './types'
import { useAppApplication } from './use-app-application'

type Props = {
  application?: AppModelApplication | string
  children: ReactNode
  frame?: ComponentType<PropsFrame> | null | string
  path?: string
  switch?: boolean
  theme?: string | Theme
}

// TODO: check if path is provided, should it somehow override AppPage root?
export const AppApplication: FunctionComponent<Props> = (props) => {
  const application = useAppApplication(props.application)
  const SwitchComponent = (props.switch ?? true) ? AppSwitch : Fragment

  return (
    <AppProvider application={application} frame={props.frame} theme={props.theme}>
      <AppBoundary>
        <AppSuspense>
          <SwitchComponent>{props.children}</SwitchComponent>
        </AppSuspense>
      </AppBoundary>
    </AppProvider>
  )
}
