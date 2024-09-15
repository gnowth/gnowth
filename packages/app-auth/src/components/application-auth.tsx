import { AppApplication, AppModelApplication, AppPage, AppPageNotFound } from '@gnowth/lib-react'
import { FunctionComponent } from 'react'

import { AuthPageToken } from '../modules/application-auth.tokens'
import { PageLogin } from './page-login'
import { PageSignup } from './page-signup'

interface Props {
  application?: AppModelApplication | string
  path?: string
}

export const ApplicationAuth: FunctionComponent<Props> = (props) => (
  <AppApplication application={props.application ?? 'auth'} path={props.path}>
    <AppPage component={PageLogin} page={AuthPageToken.login} />

    <AppPage component={PageSignup} page={AuthPageToken.signup} />

    <AppPage component={AppPageNotFound} />
  </AppApplication>
)
