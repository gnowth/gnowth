import type { AppModelApplication } from '@gnowth/lib-react'
import React from 'react'
import { AppApplication, AppPage, AppPageNotFound } from '@gnowth/lib-react'

import { PageLogin } from './pages/page-login'
import { PageSignup } from './pages/page-signup'
import { TokenPage } from './models/app-model-application-auth'

interface Props {
  application?: AppModelApplication | string
  path?: string
}

export const ApplicationAuth: React.FunctionComponent<Props> = (props) => (
  <AppApplication application={props.application ?? 'auth'} path={props.path}>
    <AppPage component={PageLogin} page={TokenPage.login} />

    <AppPage component={PageSignup} page={TokenPage.signup} />

    <AppPage component={AppPageNotFound} />
  </AppApplication>
)
