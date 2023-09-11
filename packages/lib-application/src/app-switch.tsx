import type { ReactElement, ReactNode } from 'react'
import React from 'react'
import { matchPath, useLocation, useRouteMatch } from 'react-router-dom'

import { AppModelApplication } from './app-model-application'
import { useAppApplication } from './use-app-application'
import { useAppEnvironment } from './use-app-environment'

interface Props {
  children: ReactNode
}

interface PropsChild {
  application?: AppModelApplication | string
  from?: string
  path?: string
  page?: string
}

export function AppSwitch(props: Props): ReactElement | null {
  const application = useAppApplication()
  const environment = useAppEnvironment()
  const location = useLocation()
  const matchContext = useRouteMatch()
  let element: ReactElement = <div />
  let match: typeof matchContext | null = null

  React.Children.forEach(props.children, (child) => {
    if (match == null && React.isValidElement<PropsChild>(child)) {
      element = child

      const applicationCurrent = environment.getApplication(child.props.application || application)
      const path = child.props.path || child.props.from || applicationCurrent.getRoute(child.props.page)

      match = path ? matchPath(location.pathname, { ...child.props, path }) : matchContext
    }
  })

  return match ? React.cloneElement(element, { location, computedMatch: match }) : null
}
