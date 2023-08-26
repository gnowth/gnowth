import type { Model } from '@gnowth/lib-react'
import type { ReactElement, ReactNode } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'

import type AppModelApplication from './app-model-application'
import useAppLink from './use-app-link'
import useAppTheme from './use-app-theme'

interface Props<Value> {
  application?: AppModelApplication | string
  children: ReactNode
  component?: React.ComponentType | string
  model?: Model<Value> | string
  page?: string
  to?: string
  value?: Value
}

function AppLink<Value>(props: Props<Value>): ReactElement {
  const link = useAppLink(props)
  const theme = useAppTheme()
  const component = theme.getComponent({
    component: props.component === null ? undefined : props.component || 'link',
    namespace: 'type',
  })

  if (link) {
    return (
      <Link component={component} to={link}>
        {props.children}
      </Link>
    )
  }

  return <>{props.children}</>
}

export default AppLink
