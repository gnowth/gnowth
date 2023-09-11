import type { ReactNode } from 'react'
import React from 'react'
import { AppLayout, AsyncContext, LayoutApp } from '@gnowth/lib-react'

type Props = {
  children: ReactNode
}

export const ViewFrameTasks: React.FunctionComponent<Props> = (props) => {
  const asyncContext = React.useContext(AsyncContext)

  return (
    <LayoutApp>
      <AppLayout slot="header">
        <span>Header -</span>
        &nbsp;
        <span>{asyncContext.status}</span>
      </AppLayout>

      <AppLayout slot="main">{props.children}</AppLayout>

      <AppLayout slot="footer">Footer</AppLayout>
    </LayoutApp>
  )
}
