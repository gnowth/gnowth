import { ChakraProvider } from '@chakra-ui/react'
import { AppEnvironment } from '@gnowth/lib-react'
import { FunctionComponent, ReactNode } from 'react'
import { RecoilRoot } from 'recoil'

import { setup } from '../setup'
import { theme } from '../theme'
import { SystemNotifications } from './system-notifications'

type Props = {
  children: ReactNode
}

setup({})

export const AppLayout: FunctionComponent<Props> = (props) => {
  return (
    <html lang="en">
      <body>
        <RecoilRoot>
          <AppEnvironment theme={theme}>
            <ChakraProvider>
              <SystemNotifications />

              {props.children}
            </ChakraProvider>
          </AppEnvironment>
        </RecoilRoot>
      </body>
    </html>
  )
}
