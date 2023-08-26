import type { Model } from '@gnowth/lib-types'
import type { ReactElement } from 'react'
import React from 'react'
import { Redirect } from 'react-router-dom'

import type AppModelApplication from './app-model-application'
import useAppLink from './use-app-link'

interface Props<Value> {
  application?: AppModelApplication | string
  exact?: boolean
  from?: string
  model?: Model<Value> | string
  page?: string
  to?: string
  value?: Value
}

// TODO: find a way not to have to add from when using AppRedirect. infer from application context. need to also work with switch
function AppRedirect<Value>(props: Props<Value>): ReactElement {
  const link = useAppLink(props) ?? ''
  const linkFrom = useAppLink({ to: props.from })

  return <Redirect exact={props.exact} from={linkFrom} to={link} />
}

export default AppRedirect
