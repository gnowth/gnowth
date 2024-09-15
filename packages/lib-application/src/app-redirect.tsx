import { Model } from '@gnowth/lib-model'
import { ObjectLiteral } from '@gnowth/lib-utils'
import { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'

import { AppModelApplication } from './app-model-application'
import { useAppLink } from './use-app-link'

interface Props<Value extends ObjectLiteral> {
  application?: AppModelApplication | string
  exact?: boolean
  from?: string
  model?: Model<Value> | string
  page?: string
  to?: string
  value?: Value
}

// TODO: find a way not to have to add from when using AppRedirect. infer from application context. need to also work with switch
export function AppRedirect<Value extends ObjectLiteral>(props: Props<Value>): ReactElement {
  const link = useAppLink(props) ?? ''

  return <Navigate replace={true} to={link} />
}
