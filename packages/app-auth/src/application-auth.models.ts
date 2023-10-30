import { AppModelApplication } from '@gnowth/lib-react'

import { TokenPage } from './application-auth.tokens'

export class AppModelApplicationAuth extends AppModelApplication {
  routes = {
    [TokenPage.login]: (): string => `${this.route}login/`,
    [TokenPage.root]: (): string => this.route,
    [TokenPage.signup]: (): string => `${this.route}signup/`,
  }
}
