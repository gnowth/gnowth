import { PlatformDependency, PlatformParameters } from '@gnowth/lib-react'

import { AppUserDependency } from './app-users'
import { GroupModel } from './groups.models'
import { GroupService } from './groups.services'

export class GroupModule {
  static async construct(parameters: PlatformParameters): Promise<GroupModule> {
    await parameters.platform.moduleMount({ name: PlatformDependency.errorModule })
    await parameters.platform.moduleMountDependencies({
      constructors: parameters.constructors,
      constructorsDefault: {
        providers: {
          [AppUserDependency.groupModel]: GroupModel,
          [AppUserDependency.groupService]: GroupService,
        },
      },
    })
    return new this()
  }
}
