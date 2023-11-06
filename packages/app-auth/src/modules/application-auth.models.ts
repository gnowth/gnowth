import { AppModelApplication } from '@gnowth/lib-react'

import { AuthPageToken } from './application-auth.tokens'

export class AppModelApplicationAuth extends AppModelApplication {
  routes = {
    [AuthPageToken.login]: (): string => `${this.route}login/`,
    [AuthPageToken.root]: (): string => this.route,
    [AuthPageToken.signup]: (): string => `${this.route}signup/`,
  }
}
