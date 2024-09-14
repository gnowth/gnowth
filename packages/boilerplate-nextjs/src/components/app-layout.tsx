import type { FunctionComponent, ReactNode } from 'react'

import { ChakraProvider } from '@chakra-ui/react'
import { AppEnvironment } from '@gnowth/lib-react'
import { QueryClientProvider } from '@tanstack/react-query'
import { RecoilRoot } from 'recoil'

import { setup } from '../setup'
import { theme } from '../theme'
import { SystemNotifications } from './system-notifications'

type Props = {
  children: ReactNode
}

const configurations = setup({})

export const AppLayout: FunctionComponent<Props> = (props) => {
  return (
    <html lang="en">
      <body>
        <RecoilRoot>
          <QueryClientProvider client={configurations.queryClient}>
            <AppEnvironment i18n={configurations.i18n} theme={theme}>
              <ChakraProvider>
                <SystemNotifications />

                {props.children}
              </ChakraProvider>
            </AppEnvironment>
          </QueryClientProvider>
        </RecoilRoot>
      </body>
    </html>
  )
}
