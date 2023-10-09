import type { Model } from '@gnowth/lib-model'
import type { ObjectLike } from '@gnowth/lib-utils'
import type { ComponentType, ReactElement, ReactNode } from 'react'
import { Link } from 'react-router-dom'

import type { AppModelApplication } from './app-model-application'
import { useAppLink } from './use-app-link'
import { useAppTheme } from './use-app-theme'

interface Props<Value extends ObjectLike> {
  application?: AppModelApplication | string
  children: ReactNode
  component?: ComponentType | string
  model?: Model<Value> | string
  page?: string
  to?: string
  value?: Value
}

export function AppLink<Value extends ObjectLike>(props: Props<Value>): ReactElement {
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
