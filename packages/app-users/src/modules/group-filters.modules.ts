import { PlatformParameters } from '@gnowth/lib-react'

import { GroupFilterModel } from './group-filters.models'
import { ModuleUserConstant } from './module-users'

export class GroupFilterModule {
  static async construct(parameters: PlatformParameters): Promise<GroupFilterModule> {
    await parameters.platform.moduleMountDependencies({
      constructors: parameters.constructors,
      constructorsDefault: { providers: { [ModuleUserConstant.groupFilterModel]: GroupFilterModel } },
    })
    return new this()
  }
}
