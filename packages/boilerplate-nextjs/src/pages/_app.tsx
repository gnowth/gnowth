import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import type { ComponentType, FunctionComponent, ReactNode } from 'react'
import { withAugmented } from '@app/core'
import { ProviderRecipe } from '@app/recipes'
import { ChakraProvider, VStack } from '@chakra-ui/react'
import { QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import AppError from '../components/app-error'
import AppHead from '../components/app-head'
import AppLoading from '../components/app-loading'
import SystemToasts from '../components/system-toasts'
import setup from '../setup'

const configurations = setup()

type PropsWithChildren = { children: ReactNode }
interface Props extends AppProps {
  Component: NextPage & {
    Layout?: ComponentType<PropsWithChildren>
  }
}

const Wrapper = withAugmented({ ErrorComponent: AppError, LoadingComponent: AppLoading })(
  (props: PropsWithChildren) => props.children,
)

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

          <SystemToasts />

          <Wrapper>
            <ProviderRecipe>{page}</ProviderRecipe>
          </Wrapper>
        </ChakraProvider>
      </QueryClientProvider>
    </RecoilRoot>
  )
}

// DEBT(workaround): Streaming must be unabled to use Suspense. https://nextjs.org/docs/advanced-features/react-18/streaming
export default dynamic(() => Promise.resolve(App), { ssr: false })
