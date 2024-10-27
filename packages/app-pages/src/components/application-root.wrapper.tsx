import { AppProvider, PlatformProvider } from '@gnowth/lib-react'
import { FunctionComponent, PropsWithChildren } from 'react'
import { I18nextProvider } from 'react-i18next'

import { theme } from '../modules/theme'
import { SystemNotifications } from './system-notifications'

export const ApplicationRootWrapper: FunctionComponent<PropsWithChildren> = (props) => (
  <AppProvider theme={theme}>
    <PlatformProvider I18nClientProvider={I18nextProvider}>
      {props.children}
      <SystemNotifications />
    </PlatformProvider>
  </AppProvider>
)
