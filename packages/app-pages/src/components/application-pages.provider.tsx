import { AppProvider, PlatformProvider } from '@gnowth/lib-react'
import { FunctionComponent, PropsWithChildren } from 'react'
import { I18nextProvider } from 'react-i18next'

import { theme } from '../modules/theme'

export const ApplicationPagesProvider: FunctionComponent<PropsWithChildren> = (props) => {
  return (
    <AppProvider theme={theme}>
      <PlatformProvider I18nClientProvider={I18nextProvider}>{props.children}</PlatformProvider>
    </AppProvider>
  )
}
