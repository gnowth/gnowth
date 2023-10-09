import type { FunctionComponent, ReactNode } from 'react'
import { useContext } from 'react'
import { AppLayout, AsyncContext, LayoutApp } from '@gnowth/lib-react'

type Props = {
  children: ReactNode
}

export const ViewFrameTasks: FunctionComponent<Props> = (props) => {
  const asyncContext = useContext(AsyncContext)

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
