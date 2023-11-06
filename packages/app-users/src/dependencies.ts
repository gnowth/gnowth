import { UserModel, UserService, UserFilterModel } from '@gnowth/logic-users'

import { configs } from './configs'
import { AppModel } from './modules/app'

export const dependencies = {
  appModel: new AppModel(),
  userFilterModel: new UserFilterModel({}),
  userModel: new UserModel({}),
  userService: new UserService(configs),
}
