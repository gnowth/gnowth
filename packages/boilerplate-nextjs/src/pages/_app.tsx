import {
  ApplicationRootError,
  ApplicationRootHead,
  ApplicationRootLoading,
  ApplicationRootWrapper,
} from '@gnowth/app-pages'
import { withAugmented } from '@gnowth/app-users'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Attributes, ComponentType, Fragment, FunctionComponent, PropsWithChildren } from 'react'
import 'react-toastify/dist/ReactToastify.css'

import { setup } from '../modules/setup'

setup({})

type Props = AppProps & {
  Component: NextPage & {
    Layout?: ComponentType<PropsWithChildren<Attributes>>
  }
}

const WrapperComponent: FunctionComponent<PropsWithChildren<Attributes>> = (props) => props.children
// TODO: use SystemAugmented
const Wrapper = withAugmented<PropsWithChildren<Attributes>>({
  ErrorComponent: ApplicationRootError,
  LoadingComponent: ApplicationRootLoading,
})(WrapperComponent)

const App: FunctionComponent<Props> = (props) => {
  const Layout = props.Component.Layout ?? Fragment

  return (
    <ApplicationRootWrapper>
      <Head>
        <ApplicationRootHead />
      </Head>

      <Wrapper>
        <Layout>
          <props.Component {...props.pageProps} />
        </Layout>
      </Wrapper>
    </ApplicationRootWrapper>
  )
}

// DEBT(workaround): Streaming must be unabled to use Suspense. https://nextjs.org/docs/advanced-features/react-18/streaming
export default dynamic(() => Promise.resolve(App), { ssr: false })
