import type { PropsFrame, PropsSuspense, QueryResource, Theme } from '@gnowth/lib-types'
import type { ComponentType, ReactElement } from 'react'
import React from 'react'
import { objectDefaults } from '@gnowth/lib-utils'
import { Route, matchPath, useLocation } from 'react-router-dom'

import AppBoundary from './app-boundary'
import AppSuspense from './app-suspense'
import AppFrame from './app-frame'
import AppProvider from './app-provider'
import useAppApplication from './use-app-application'
import AppWhoAmI from './app-who-am-i'

interface PropsComponent {
  resources: Record<string, QueryResource | undefined>
}

interface Props {
  authenticated?: boolean
  component: ComponentType<PropsComponent>
  exact?: boolean
  frame?: ComponentType<PropsFrame> | string | null
  page?: string
  path?: string
  suspense?: ComponentType<PropsSuspense> | string | null
  suspenseClassName?: string
  theme?: Theme | string
}

const propsDefault = {
  suspense: 'page',
}

// TODO: add transition in pages http://reactcommunity.org/react-transition-group/with-react-router/
// TODO: since AppFrame is a child of route, it will rerender on route change. is there a way to keep it mounted if next route is the same component?
function AppPage(props: Props): ReactElement {
  const application = useAppApplication()
  const location = useLocation()
  const propsWithDefault = objectDefaults(props, propsDefault)

  const match = matchPath(location.pathname, {
    exact: propsWithDefault.exact,
    path: propsWithDefault.path || application.getRoute(propsWithDefault.page),
  })
  const makeResources = application.getResources(propsWithDefault.page)
  const resources = makeResources(match?.params ?? {})
  const Component = propsWithDefault.component

  return (
    <Route
      exact={propsWithDefault.exact}
      path={propsWithDefault.path || application.getRoute(propsWithDefault.page)}
    >
      <AppProvider frame={propsWithDefault.frame} page={propsWithDefault.page} theme={propsWithDefault.theme}>
        <AppFrame>
          <AppBoundary>
            <AppSuspense
              suspense={propsWithDefault.suspense}
              suspenseClassName={propsWithDefault.suspenseClassName}
            >
              <AppWhoAmI authenticated={propsWithDefault.authenticated} />

              <Component resources={resources} />
            </AppSuspense>
          </AppBoundary>
        </AppFrame>
      </AppProvider>
    </Route>
  )
}

export default AppPage
