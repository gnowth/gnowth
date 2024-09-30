import { PlatformParameters } from '@gnowth/lib-platform'

import { LogicUserConstant } from '../module.constants'
import { GroupFilterModel } from './group-filters.models'

export class GroupFilterModule {
  static async construct(parameters: PlatformParameters): Promise<GroupFilterModule> {
    await parameters.platform.moduleMountDependencies({
      constructors: parameters.constructors,
      constructorsDefault: { providers: { [LogicUserConstant.groupFilterModel]: GroupFilterModel } },
    })
    return new this()
  }
}
