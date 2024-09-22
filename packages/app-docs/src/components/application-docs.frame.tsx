import { AppLayout } from '@gnowth/lib-react'
import { FunctionComponent, PropsWithChildren } from 'react'

export const ApplicationDocsFrame: FunctionComponent<PropsWithChildren> = (props) => (
  <AppLayout layout="app">
    <AppLayout layout="appMain" layoutProps={{ flexGrow: 1 }} slot="main">
      {props.children}
    </AppLayout>
  </AppLayout>
)
