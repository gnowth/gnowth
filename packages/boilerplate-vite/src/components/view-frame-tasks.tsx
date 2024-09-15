import type { FunctionComponent, ReactNode } from 'react'

import { AppLayout, LayoutApp } from '@gnowth/lib-react'
import { useIsFetching } from '@tanstack/react-query'

type Props = {
  children: ReactNode
}

export const ViewFrameTasks: FunctionComponent<Props> = (props) => {
  const isFetching = useIsFetching()

  return (
    <LayoutApp>
      <AppLayout slot="header">
        <span>Header -</span>
        &nbsp;
        <span>{!!isFetching && 'fetching'}</span>
      </AppLayout>

      <AppLayout slot="main">{props.children}</AppLayout>

      <AppLayout slot="footer">Footer</AppLayout>
    </LayoutApp>
  )
}
