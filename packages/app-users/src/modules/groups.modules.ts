import { PlatformConstant, PlatformParameters } from '@gnowth/lib-react'

import { GroupModel } from './groups.models'
import { GroupService } from './groups.services'
import { ModuleUserConstant } from './module-users'

export class GroupModule {
  static async construct(parameters: PlatformParameters): Promise<GroupModule> {
    await parameters.platform.moduleMount({ name: PlatformConstant.errorModule, type: 'module' })
    await parameters.platform.moduleMountDependencies({
      constructors: parameters.constructors,
      constructorsDefault: {
        providers: {
          [ModuleUserConstant.groupModel]: GroupModel,
          [ModuleUserConstant.groupService]: GroupService,
        },
      },
    })
    return new this()
  }
}
