import type { ReactElement, ReactNode } from 'react'

import { Children, cloneElement, isValidElement } from 'react'
import { matchPath, useLocation } from 'react-router-dom'

import { AppModelApplication } from './app-model-application'
import { useAppApplication } from './use-app-application'
import { useAppEnvironment } from './use-app-environment'

interface Props {
  children: ReactNode
}

interface PropsChild {
  application?: AppModelApplication | string
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
      const path = child.props.path || child.props.from || applicationCurrent.getRoute(child.props.page)

      match = path ? matchPath({ ...child.props, path }, location.pathname) : null
    }
  })

  return match ? cloneElement(element, { computedMatch: match, location }) : null
}
