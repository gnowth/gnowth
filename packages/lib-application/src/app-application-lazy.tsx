import type { ComponentType, ReactElement } from 'react'
import React from 'react'

import { AppModelApplication } from './app-model-application'

interface PropsComponent {
  application?: AppModelApplication | string
  path?: string
}

interface Props {
  application?: AppModelApplication | string
  component: ComponentType<PropsComponent>
  path?: string
}

export function AppApplicationLazy(props: Props): ReactElement {
  const Component = props.component

  return <Component application={props.application} path={props.path} />
}
