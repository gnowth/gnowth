import type { Model } from '@gnowth/lib-model'
import type { ObjectLiteral } from '@gnowth/lib-utils'
import type { ComponentType, ReactElement, ReactNode } from 'react'

import { Link } from 'react-router-dom'

import type { AppModelApplication } from './app-model-application'

import { useAppLink } from './use-app-link'

interface Props<Value extends ObjectLiteral> {
  application?: AppModelApplication | string
  children: ReactNode
  component?: ComponentType | string
  model?: Model<Value> | string
  page?: string
  to?: string
  value?: Value
}

export function AppLink<Value extends ObjectLiteral>(props: Props<Value>): ReactElement {
  const link = useAppLink(props)

  if (link) {
    return <Link to={link}>{props.children}</Link>
  }

  return <>{props.children}</>
}
