import { ChakraProvider } from '@chakra-ui/react'
import { withAugmented } from '@gnowth/app-users'
import { AppEnvironment } from '@gnowth/lib-react'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Attributes, ComponentType, Fragment, FunctionComponent, PropsWithChildren } from 'react'
import { RecoilRoot } from 'recoil'

import { AppError } from '../components/app-error'
import { AppHead } from '../components/app-head'
import { AppLoading } from '../components/app-loading'
import { SystemNotifications } from '../components/system-notifications'
import { setup } from '../setup'
import { theme } from '../theme'

setup({})

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
  const Layout = props.Component.Layout ?? Fragment

  return (
    <RecoilRoot>
      <AppEnvironment theme={theme}>
        <ChakraProvider>
          <Head>
            <AppHead />
          </Head>

          <SystemNotifications />

          <Wrapper>
            <Layout>
              <props.Component {...props.pageProps} />
            </Layout>
          </Wrapper>
        </ChakraProvider>
      </AppEnvironment>
    </RecoilRoot>
  )
}

// DEBT(workaround): Streaming must be unabled to use Suspense. https://nextjs.org/docs/advanced-features/react-18/streaming
export default dynamic(() => Promise.resolve(App), { ssr: false })
