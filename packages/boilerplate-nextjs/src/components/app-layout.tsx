import type { FunctionComponent, ReactNode } from 'react'

import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'

import { setup } from '../setup'
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
            <ChakraProvider>
              <SystemNotifications />

              {props.children}
            </ChakraProvider>
          </QueryClientProvider>
        </RecoilRoot>
      </body>
    </html>
  )
}
