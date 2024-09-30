import { PlatformConstant, PlatformParameters } from '@gnowth/lib-platform'

import { LogicUserConstant } from '../module.constants'
import { GroupModel } from './groups.models'
import { GroupService } from './groups.services'

export class GroupModule {
  static async construct(parameters: PlatformParameters): Promise<GroupModule> {
    await parameters.platform.moduleMount({ name: PlatformConstant.errorModule, type: 'module' })
    await parameters.platform.moduleMountDependencies({
      constructors: parameters.constructors,
      constructorsDefault: {
        providers: {
          [LogicUserConstant.groupModel]: GroupModel,
          [LogicUserConstant.groupService]: GroupService,
        },
      },
    })
    return new this()
  }
}
