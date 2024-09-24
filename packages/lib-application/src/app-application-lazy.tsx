import { ComponentType, FunctionComponent } from 'react'

import { AppModelApplication } from './app-model-application'

interface PropsComponent {
  application?: AppModelApplication | string
  path?: string
}

type Props = {
  application?: AppModelApplication | string
  component: ComponentType<PropsComponent>
  path?: string
}

export const AppApplicationLazy: FunctionComponent<Props> = (props) => {
  const Component = props.component
  return <Component application={props.application} path={props.path} />
}
