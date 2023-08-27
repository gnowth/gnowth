import React from 'react'
import ReactDOM from 'react-dom'
import { ApplicationAuth } from '@gnowth/app-auth'
import { ApplicationPages, PageNotAuthorised, PageNotFound, PageNotPermitted } from '@gnowth/app-pages'
import { AppApplicationLazy, AppEnvironment, AppRedirect, TokenError } from '@gnowth/lib-react'

import ViewFrameDefault from './views/view-frame-default'
import ViewFrameRecipes from './views/view-frame-recipes'
import ViewFrameTasks from './views/view-frame-tasks'
import modelAppEnvironment, { TokenApplication } from './app-model-environment'
import settings from './settings'
import setup from './setup'
import theme from './theme'

const ApplicationRecipes = React.lazy(() => import('@gnowth/app-recipe'))
const ApplicationTasks = React.lazy(() => import('@gnowth/app-tasks'))

setup(settings)

// Note should theme include layouts or should it be separate
// Datasource if offline mode, these can be added to appEnvironment
// mocking flag can be added here as well or per data source or should it be a separate server could still use process.ENV
// Note: because of the limitation of how react router work, path need to be added explicitly for Switch to work. Solution could probably be available in react-router v6
// TODO: handle page redirect and auth
ReactDOM.render(
  <AppEnvironment
    boundaries={{
      [TokenError.api401]: PageNotAuthorised,
      [TokenError.api403]: PageNotPermitted,
      [TokenError.api404]: PageNotFound,
    }}
    environment={modelAppEnvironment}
    frame="default"
    frames={{ default: ViewFrameDefault, recipes: ViewFrameRecipes, tasks: ViewFrameTasks }}
    theme={theme}
  >
    <ApplicationAuth application={TokenApplication.auth} />

    <ApplicationPages application={TokenApplication.pages} />

    <AppApplicationLazy application={TokenApplication.recipes} component={ApplicationRecipes} />

    <ApplicationTasks application={TokenApplication.tasks} />

    <AppRedirect application={TokenApplication.pages} />
  </AppEnvironment>,
  document.getElementById('main'),
)
