import { QueryService } from '@gnowth/logic-core'
import { GroupModel, GroupService, UserModel, UserService, UserFilterModel } from '@gnowth/logic-users'

import { configs } from './configs'
import { AppModel } from './modules/app'

const userModel = new UserModel({})
const groupModel = new GroupModel({})
const queryService = new QueryService()

export const dependencies = {
  appModel: new AppModel(),
  groupModel,
  groupService: new GroupService({ ...configs, dependencies: { groupModel, queryService } }),
  userFilterModel: new UserFilterModel({}),
  userModel,
  userService: new UserService({ ...configs, dependencies: { queryService, userModel } }),
}
