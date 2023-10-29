import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import type { ComponentType, FunctionComponent, Attributes, PropsWithChildren } from 'react'
import { withAugmentedDeprecated } from '@gnowth/app-core'
import { ChakraProvider, VStack } from '@chakra-ui/react'
import { QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import { AppError } from '../components/app-error'
import { AppHead } from '../components/app-head'
import { AppLoading } from '../components/app-loading'
import { SystemNotifications } from '../components/system-notifications'
import { setup } from '../setup'

const configurations = setup()

interface Props extends AppProps {
  Component: NextPage & {
    Layout?: ComponentType<PropsWithChildren<Attributes>>
  }
}

const WrapperComponent: FunctionComponent<PropsWithChildren<Attributes>> = (props) => props.children
// TODO: use SystemAugmented
const Wrapper = withAugmentedDeprecated<PropsWithChildren<Attributes>>({
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
        <ChakraProvider>
          <Head>
            <AppHead />
          </Head>

          <SystemNotifications />

          <Wrapper>{page}</Wrapper>
        </ChakraProvider>
      </QueryClientProvider>
    </RecoilRoot>
  )
}

// DEBT(workaround): Streaming must be unabled to use Suspense. https://nextjs.org/docs/advanced-features/react-18/streaming
export default dynamic(() => Promise.resolve(App), { ssr: false })
