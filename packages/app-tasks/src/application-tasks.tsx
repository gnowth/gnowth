import type { AppModelApplication } from '@gnowth/lib-react'
import React from 'react'
import { AppApplication, AppPage, AppRedirect, AppPageNotFound } from '@gnowth/lib-react'

// Note: AppModelApplicationTasks should probably be imported at root only? and pass down
import { AppModelApplicationTasks } from './models/app-model-application-tasks'

const PageBoard = React.lazy(() =>
  import('./pages/page-board').then((module) => ({ default: module.PageBoard })),
)
const PageDashboard = React.lazy(() =>
  import('./pages/page-dashboard').then((module) => ({ default: module.PageDashboard })),
)
const PageLanding = React.lazy(() =>
  import('./pages/page-landing').then((module) => ({ default: module.PageLanding })),
)
const PageReport = React.lazy(() =>
  import('./pages/page-report').then((module) => ({ default: module.PageReport })),
)

interface Props {
  application?: AppModelApplication | string
  path?: string
}

export const ApplicationTasks: React.FunctionComponent<Props> = (props) => (
  <AppApplication application={props.application ?? 'tasks'} path={props.path}>
    <AppPage authenticated={false} component={PageLanding} path={AppModelApplicationTasks.routes.landing} />

    <AppPage authenticated component={PageDashboard} exact path={AppModelApplicationTasks.routes.dashboard} />

    <AppPage
      authenticated
      component={PageBoard}
      frame={null}
      path={AppModelApplicationTasks.routes.board(':boardId')}
    />

    <AppPage authenticated component={PageReport} exact path={AppModelApplicationTasks.routes.report} />

    <AppRedirect from="/tasks/" exact to={AppModelApplicationTasks.routes.landing} />

    <AppPage component={AppPageNotFound} path={AppModelApplicationTasks.routes.root} />
  </AppApplication>
)
