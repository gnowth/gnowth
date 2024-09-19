import { ApplicationAuth } from '@gnowth/app-auth'
import { ApplicationPages, PageNotAuthorised, PageNotFound, PageNotPermitted } from '@gnowth/app-pages'
import {
  AppApplicationLazy,
  AppEnvironment,
  AppModelEnvironment,
  AppRedirect,
  TokenErrorType,
} from '@gnowth/lib-react'
import { FunctionComponent, lazy } from 'react'

import { TokenApplication } from '../modules/app-model-environment'
import { theme } from '../modules/theme'
import { ViewFrameDefault } from './view-frame-default'
import { ViewFrameTasks } from './view-frame-tasks'

// TODO: add recipe application
const ApplicationRecipes = lazy(() =>
  import('@gnowth/app-recipes').then((module) => ({ default: module.ApplicationRecipes })),
)
const ApplicationTasks = lazy(() =>
  import('@gnowth/app-tasks').then((module) => ({ default: module.ApplicationTasks })),
)

// Note should theme include layouts or should it be separate
// Datasource if offline mode, these can be added to appEnvironment
// mocking flag can be added here as well or per data source or should it be a separate server could still use process.ENV
// Note: because of the limitation of how react router work, path need to be added explicitly for Switch to work. Solution could probably be available in react-router v6
// TODO: handle page redirect and auth
type Props = { environment: AppModelEnvironment }
export const App: FunctionComponent<Props> = (props) => (
  <AppEnvironment
    boundaries={{
      [TokenErrorType.api401]: PageNotAuthorised,
      [TokenErrorType.api403]: PageNotPermitted,
      [TokenErrorType.api404]: PageNotFound,
    }}
    environment={props.environment}
    frame="default"
    frames={{ default: ViewFrameDefault, tasks: ViewFrameTasks }}
    theme={theme}
  >
    <ApplicationAuth application={TokenApplication.auth} />
    <ApplicationPages application={TokenApplication.pages} />
    <AppApplicationLazy application={TokenApplication.recipes} component={ApplicationRecipes} />
    <AppApplicationLazy application={TokenApplication.tasks} component={ApplicationTasks} />
    <AppRedirect application={TokenApplication.pages} exact from="/" />
  </AppEnvironment>
)
