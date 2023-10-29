import { AppModelApplication, Model } from '@gnowth/lib-react'

import { TokenPage } from './application-auth.tokens'

interface User {
  nameFirst: string
  nameLast: string
  uuid: string
}

// TODO: remove model user
class ModelUser<Value extends User = User> extends Model<Value> {
  modelName = 'user'
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
