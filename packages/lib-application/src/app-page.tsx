import { Theme } from '@gnowth/lib-theme'
import { objectDefaults } from '@gnowth/lib-utils'
import { ComponentType, FunctionComponent } from 'react'
import { matchPath, useLocation } from 'react-router-dom'

import { AppBoundary } from './app-boundary'
import { AppFrame } from './app-frame'
import { AppProvider } from './app-provider'
import { AppSuspense } from './app-suspense'
import { AppWhoAmI } from './app-who-am-i'
import { QueryResource } from './queries/query-resource'
import { PropsFrame, PropsSuspense } from './types'
import { useAppApplication } from './use-app-application'

type Props = {
  authenticated?: boolean
  component: ComponentType<PropsComponent>
  exact?: boolean
  frame?: ComponentType<PropsFrame> | null | string
  page?: string
  path?: string
  suspense?: ComponentType<PropsSuspense> | null | string
  suspenseClassName?: string
  theme?: string | Theme
}

type PropsComponent = {
  resources: Record<string, QueryResource | undefined>
}

const propsDefault = {
  suspense: 'page',
}

// TODO: add transition in pages http://reactcommunity.org/react-transition-group/with-react-router/
// TODO: since AppFrame is a child of route, it will rerender on route change. is there a way to keep it mounted if next route is the same component?
export const AppPage: FunctionComponent<Props> = (props) => {
  const application = useAppApplication()
  const location = useLocation()
  const propsWithDefault = objectDefaults(props, propsDefault)
  const path = propsWithDefault.path ?? application.getRoute(propsWithDefault.page) ?? ''

  const match = matchPath({ end: propsWithDefault.exact ?? false, path }, location.pathname)
  const makeResources = application.getResources(propsWithDefault.page)
  const resources = makeResources(match?.params ?? {})
  const Component = propsWithDefault.component

  return (
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
  )
}
