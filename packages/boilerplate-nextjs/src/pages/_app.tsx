import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import type { ComponentType, FunctionComponent } from 'react'
import dynamic from 'next/dynamic'

import { LayoutApp } from '../components/layout-app'
import FrameDefault from '../views/frame-default'
import runSetup from '../setup'

const setup = runSetup()

interface Props extends AppProps {
  Component: NextPage & {
    Layout?: ComponentType
  }
}

const App: FunctionComponent<Props> = (props) => {
  return (
    <LayoutApp queryClient={setup.queryClient}>
      <FrameDefault component={props.Component}>
        <props.Component {...props.pageProps} />
      </FrameDefault>
    </LayoutApp>
  )
}

// DEBT(workaround): Streaming must be unabled to use Suspense. https://nextjs.org/docs/advanced-features/react-18/streaming
export default dynamic(() => Promise.resolve(App), { ssr: false })
