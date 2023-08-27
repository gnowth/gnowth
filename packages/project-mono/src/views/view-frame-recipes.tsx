import type { ReactNode } from 'react'
import React from 'react'
import { AppLayout } from '@gnowth/lib-react'

import ViewAppFooter from './view-app-footer'
import ViewAppHeader from './view-app-header'

type Props = {
  children: ReactNode
}

const ViewFrameRecipes: React.FunctionComponent<Props> = (props) => (
  <AppLayout layout="app">
    <AppLayout layout="appHeader" slot="header">
      <ViewAppHeader />
    </AppLayout>

    <AppLayout layout="appMain" slot="main">
      {props.children}
    </AppLayout>

    <AppLayout layout="appFooter" slot="footer">
      <ViewAppFooter />
    </AppLayout>
  </AppLayout>
)

export default ViewFrameRecipes
