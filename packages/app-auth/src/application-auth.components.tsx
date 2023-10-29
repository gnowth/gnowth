import type { AppModelApplication } from '@gnowth/lib-react'
import type { FunctionComponent } from 'react'
import { AppApplication, AppPage, AppPageNotFound } from '@gnowth/lib-react'

import { TokenPage } from './application-auth.tokens'
import { PageLogin } from './pages/page-login'
import { PageSignup } from './pages/page-signup'

interface Props {
  application?: AppModelApplication | string
  path?: string
}

export const ApplicationAuth: FunctionComponent<Props> = (props) => (
  <AppApplication application={props.application ?? 'auth'} path={props.path}>
    <AppPage component={PageLogin} page={TokenPage.login} />

    <AppPage component={PageSignup} page={TokenPage.signup} />

    <AppPage component={AppPageNotFound} />
  </AppApplication>
)
