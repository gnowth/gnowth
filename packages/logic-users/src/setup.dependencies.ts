import type { AppSetup } from '@gnowth/lib-application'
import { QueryService } from '@gnowth/logic-core'

import { GroupFilterModel } from './modules/group-filters'
import { GroupModel, GroupService } from './modules/groups'
import { UserFilterModel } from './modules/user-filters'
import { UserModel, UserService } from './modules/users'

type Configs = {
  apiContext: string
  apiOrigin: string
}
type ConfigurationDependencies = {
  dependencies: {
    groupFilterModel: GroupFilterModel
    groupModel: GroupModel
    groupService: GroupService
    userFilterModel: UserFilterModel
    userModel: UserModel
    userService: UserService
  }
}
export const setupDependencies: AppSetup<ConfigurationDependencies, Configs> = (configs: Configs) => {
  const groupModel = new GroupModel({})
  const queryService = new QueryService()
  const userModel = new UserModel({})

  return {
    dependencies: {
      groupFilterModel: new GroupFilterModel({}),
      groupModel,
      groupService: new GroupService({ ...configs, dependencies: { groupModel, queryService } }),
      userFilterModel: new UserFilterModel({}),
      userModel,
      userService: new UserService({ ...configs, dependencies: { queryService, userModel } }),
    },
  }
}
