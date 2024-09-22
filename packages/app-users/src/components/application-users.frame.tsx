import { AppLayout } from '@gnowth/lib-react'
import { FunctionComponent, PropsWithChildren } from 'react'

import { ApplicationUsersProvider } from './application-users.provider'
import { SectionFooter } from './section-footer'
import { SectionHeader } from './section-header'

export const ApplicationUsersFrame: FunctionComponent<PropsWithChildren> = (props) => (
  <ApplicationUsersProvider>
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
  </ApplicationUsersProvider>
)
