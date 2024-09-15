import { AppSetup } from '@gnowth/lib-application'

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
  return {
    dependencies: {
      groupFilterModel: new GroupFilterModel({}),
      groupModel: new GroupModel({}),
      groupService: new GroupService(configs),
      userFilterModel: new UserFilterModel({}),
      userModel: new UserModel({}),
      userService: new UserService(configs),
    },
  }
}
