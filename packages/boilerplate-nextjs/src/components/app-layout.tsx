import type { FunctionComponent, ReactNode } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'

import { setup } from '../setup'
import { SystemToasts } from './system-toasts'

type Props = {
  children: ReactNode
}

const configurations = setup()

export const AppLayout: FunctionComponent<Props> = (props) => {
  return (
    <html lang="en">
      <body>
        <RecoilRoot>
          <QueryClientProvider client={configurations.queryClient}>
            <ChakraProvider>
              <SystemToasts />

              {props.children}
            </ChakraProvider>
          </QueryClientProvider>
        </RecoilRoot>
      </body>
    </html>
  )
}
