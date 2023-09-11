import type { ReactNode } from 'react'
import React from 'react'
import { LayoutApp, UtilSlot } from '@gnowth/lib-react'

import ViewAppFooter from './view-app-footer'
import ViewAppHeader from './view-app-header'

type Props = {
  children: ReactNode
}

const ViewFrameDefault: React.FunctionComponent<Props> = (props) => (
  <LayoutApp palette="text" paletteWeight="100" spacing={0}>
    <ViewAppHeader slot="header" />

    <UtilSlot slot="main">{props.children}</UtilSlot>

    <ViewAppFooter slot="footer" />
  </LayoutApp>
)

export default ViewFrameDefault
