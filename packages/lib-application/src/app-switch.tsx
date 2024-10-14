import { Children, ReactElement, ReactNode, cloneElement, isValidElement } from 'react'
import { matchPath, useLocation } from 'react-router-dom'

import { AppModelApplication } from './app-model-application'
import { useAppApplication } from './use-app-application'
import { useAppEnvironment } from './use-app-environment'

type Props = {
  children: ReactNode
}

type PropsChild = {
  application?: AppModelApplication | string
  exact?: boolean
  from?: string
  page?: string
  path?: string
}

export function AppSwitch(props: Props): ReactElement | null {
  const application = useAppApplication()
  const environment = useAppEnvironment()
  const location = useLocation()
  let element: ReactElement = <div />
  let match: ReturnType<typeof matchPath> | null = null

  Children.forEach(props.children, (child) => {
    if (match == null && isValidElement<PropsChild>(child)) {
      element = child
      const applicationCurrent = environment.getApplication(child.props.application || application)
      const path = child.props.path ?? child.props.from ?? applicationCurrent.getRoute(child.props.page)
      const end = child.props.exact ?? false
      match = path ? matchPath({ ...child.props, end, path }, location.pathname) : null
    }
  })

  return match ? cloneElement(element, { computedMatch: match, location }) : null
}
