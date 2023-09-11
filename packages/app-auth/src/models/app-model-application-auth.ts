import { AppModelApplication } from '@gnowth/lib-react'

import { ModelUser } from './model-user'

export enum TokenPage {
  signup = 'signup',
  login = 'login',
  root = 'root',
}

export class AppModelApplicationAuth extends AppModelApplication {
  models = {
    user: new ModelUser({}),
  }

  routes = {
    [TokenPage.login]: (): string => `${this.route}login/`,
    [TokenPage.root]: (): string => this.route,
    [TokenPage.signup]: (): string => `${this.route}signup/`,
  }
}
