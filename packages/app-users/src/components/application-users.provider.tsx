import { PlatformProvider } from '@gnowth/lib-react'
import { QueryClientProvider } from '@tanstack/react-query'
import { FunctionComponent, PropsWithChildren } from 'react'
import { I18nextProvider } from 'react-i18next'

export const ApplicationUsersProvider: FunctionComponent<PropsWithChildren> = (props) => (
  <PlatformProvider I18nClientProvider={I18nextProvider} QueryClientProvider={QueryClientProvider}>
    {props.children}
  </PlatformProvider>
)
