import { ChakraProvider } from '@chakra-ui/react'
import { AppProvider, PlatformDependencies, PlatformProvider } from '@gnowth/lib-react'
import { QueryClientProvider } from '@tanstack/react-query'
import { FunctionComponent, PropsWithChildren } from 'react'
import { I18nextProvider } from 'react-i18next'
import { RecoilRoot } from 'recoil'

import { AppUserDependency, AppUserModule } from '../modules/app-users'
import { theme } from '../modules/theme'
import { UserFilterModule } from '../modules/user-filters'
import { UserModule } from '../modules/users'

export const ApplicationUsersProvider: FunctionComponent<PropsWithChildren> = (props) => {
  return (
    <RecoilRoot>
      <AppProvider theme={theme}>
        <PlatformDependencies
          definitions={[
            {
              constructors: { modules: { [AppUserDependency.appUserModule]: AppUserModule } },
              name: AppUserDependency.appUserModule,
              type: 'module',
            },
            {
              constructors: { modules: { [AppUserDependency.userModule]: UserModule } },
              name: AppUserDependency.userModule,
              type: 'module',
            },
            {
              constructors: { modules: { [AppUserDependency.userFilterModule]: UserFilterModule } },
              name: AppUserDependency.userFilterModule,
              type: 'module',
            },
          ]}
        />

        <PlatformProvider I18nClientProvider={I18nextProvider} QueryClientProvider={QueryClientProvider}>
          <ChakraProvider>{props.children}</ChakraProvider>
        </PlatformProvider>
      </AppProvider>
    </RecoilRoot>
  )
}
