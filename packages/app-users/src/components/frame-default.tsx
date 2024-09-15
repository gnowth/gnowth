import { AppLayout } from '@gnowth/lib-react'
import { FunctionComponent, PropsWithChildren } from 'react'

import { SectionFooter } from './section-footer'
import { SectionHeader } from './section-header'

export const FrameDefault: FunctionComponent<PropsWithChildren> = (props) => (
  <AppLayout layout="app">
    <AppLayout layout="appHeader" slot="header">
      <SectionHeader />
    </AppLayout>

    <AppLayout layout="appMain" layoutProps={{ flexGrow: 1 }} slot="main">
      {props.children}
    </AppLayout>

    <AppLayout layout="appFooter" slot="footer">
      <SectionFooter />
    </AppLayout>
  </AppLayout>
)
