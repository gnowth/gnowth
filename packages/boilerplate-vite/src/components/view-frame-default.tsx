import { AppLayout } from '@gnowth/lib-react'
import { FunctionComponent, ReactNode } from 'react'

import { ViewAppFooter } from './view-app-footer'
import { ViewAppHeader } from './view-app-header'

type Props = {
  children: ReactNode
}

export const ViewFrameDefault: FunctionComponent<Props> = (props) => (
  <AppLayout layout="app">
    <AppLayout layout="appHeader" slot="header">
      <ViewAppHeader />
    </AppLayout>

    <AppLayout layout="appMain" layoutProps={{ flexGrow: '1' }} slot="main">
      {props.children}
    </AppLayout>

    <AppLayout layout="appFooter" slot="footer">
      <ViewAppFooter />
    </AppLayout>
  </AppLayout>
)
