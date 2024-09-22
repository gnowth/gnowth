import { ChakraProvider } from '@chakra-ui/react'
import { AppProvider, PlatformProvider } from '@gnowth/lib-react'
import { QueryClientProvider } from '@tanstack/react-query'
import { FunctionComponent, PropsWithChildren } from 'react'
import { I18nextProvider } from 'react-i18next'
import { RecoilRoot } from 'recoil'

import { theme } from '../modules/theme'

export const ApplicationUsersProvider: FunctionComponent<PropsWithChildren> = (props) => {
  return (
    <RecoilRoot>
      <AppProvider theme={theme}>
        <PlatformProvider I18nClientProvider={I18nextProvider} QueryClientProvider={QueryClientProvider}>
          <ChakraProvider>{props.children}</ChakraProvider>
        </PlatformProvider>
      </AppProvider>
    </RecoilRoot>
  )
}
