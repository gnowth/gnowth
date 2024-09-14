import type { Theme } from '@gnowth/lib-theme'
import type { i18n } from 'i18next'
import type { ComponentType, ReactElement, ReactNode } from 'react'

import { Fragment } from 'react'

import type { PropsFrame } from './types'

import { AppBoundary } from './app-boundary'
import { AppModelApplication } from './app-model-application'
import { AppProvider } from './app-provider'
import { AppSuspense } from './app-suspense'
import { AppSwitch } from './app-switch'
import { useAppApplication } from './use-app-application'

interface Props {
  application?: AppModelApplication | string
  children: ReactNode
  frame?: ComponentType<PropsFrame> | null | string
  i18n?: i18n
  path?: string
  switch?: boolean
  theme?: Theme | string
}

// TODO: check if path is provided, should it somehow override AppPage root?
export function AppApplication(props: Props): ReactElement {
  const application = useAppApplication(props.application)
  const SwitchComponent = (props.switch ?? true) ? AppSwitch : Fragment

  return (
    <AppProvider application={application} frame={props.frame} i18n={props.i18n} theme={props.theme}>
      <AppBoundary>
        <AppSuspense>
          <SwitchComponent>{props.children}</SwitchComponent>
        </AppSuspense>
      </AppBoundary>
    </AppProvider>
  )
}
