import type { FunctionComponent, ReactNode } from 'react'
import type { QueryClient } from 'react-query'
import { ProviderRecipe } from '@app/recipe'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
import Head from 'next/head'

import SystemToasts from '../views/system-toasts'

type Props = {
  children: ReactNode
  queryClient: QueryClient
}

export const LayoutApp: FunctionComponent<Props> = (props) => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={props.queryClient}>
        <ChakraProvider>
          <ProviderRecipe>
            <Head>
              <title>Create Next App</title>
              <meta name="description" content="Generated by create next app" />
              <link rel="icon" href="/favicon.ico" />
            </Head>

            <SystemToasts />

            {props.children}
          </ProviderRecipe>
        </ChakraProvider>
      </QueryClientProvider>
    </RecoilRoot>
  )
}