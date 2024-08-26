import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import type { Attributes, ComponentType, FunctionComponent, PropsWithChildren } from 'react'

import { ChakraProvider, VStack } from '@chakra-ui/react'
import { withAugmented } from '@gnowth/app-users'
import { AppEnvironment } from '@gnowth/lib-react'
import { QueryClientProvider } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { RecoilRoot } from 'recoil'

import { AppError } from '../components/app-error'
import { AppHead } from '../components/app-head'
import { AppLoading } from '../components/app-loading'
import { SystemNotifications } from '../components/system-notifications'
import { setup } from '../setup'
import { theme } from '../theme'

const configurations = setup({})

interface Props extends AppProps {
  Component: {
    Layout?: ComponentType<PropsWithChildren<Attributes>>
  } & NextPage
}

const WrapperComponent: FunctionComponent<PropsWithChildren<Attributes>> = (props) => props.children
// TODO: use SystemAugmented
const Wrapper = withAugmented<PropsWithChildren<Attributes>>({
  ErrorComponent: AppError,
  LoadingComponent: AppLoading,
})(WrapperComponent)

const App: FunctionComponent<Props> = (props) => {
  const page = props.Component.Layout ? (
    <props.Component.Layout>
      <props.Component {...props.pageProps} />
    </props.Component.Layout>
  ) : (
    <VStack alignItems="stretch" minHeight="100vh" spacing="10">
      <props.Component {...props.pageProps} />
    </VStack>
  )

  return (
    <RecoilRoot>
      <QueryClientProvider client={configurations.queryClient}>
        <AppEnvironment theme={theme}>
          <ChakraProvider>
            <Head>
              <AppHead />
            </Head>

            <SystemNotifications />

            <Wrapper>{page}</Wrapper>
          </ChakraProvider>
        </AppEnvironment>
      </QueryClientProvider>
    </RecoilRoot>
  )
}

// DEBT(workaround): Streaming must be unabled to use Suspense. https://nextjs.org/docs/advanced-features/react-18/streaming
export default dynamic(() => Promise.resolve(App), { ssr: false })
