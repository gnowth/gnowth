import { PlatformParameters } from '@gnowth/lib-platform'

import { LogicUserConstant } from '../module.constants'
import { UserFilterModel } from './user-filters.models'

export class UserFilterModule {
  static async construct(parameters: PlatformParameters): Promise<UserFilterModule> {
    await parameters.platform.moduleMountDependencies({
      constructors: parameters.constructors,
      constructorsDefault: { providers: { [LogicUserConstant.userFilterModel]: UserFilterModel } },
    })
    return new this()
  }
}
